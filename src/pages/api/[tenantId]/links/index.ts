import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'

import { z } from 'zod'

import { getPaginated, create } from '~/services/links'
import { checkTenantPermission } from '~/services/user'

import { authOptions } from '../../auth/[...nextauth]'

const linkBodySchema = z.object({
  data: z.object({
    internalName: z.string(),
    publicName: z.string(),
    slug: z.string(),
    destination: z.string(),
  }),
})
const linkQuerySchema = z.object({
  tenantId: z.string(),
  cursor: z.optional(z.string()),
  take: z.optional(z.coerce.number()),
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { tenantId, take, cursor } = linkQuerySchema.parse(req.query)
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).send({
      error: 'You must be signed in.',
    })
  }

  const { isValid } = await checkTenantPermission(session.id, tenantId)

  if (!isValid) {
    res.status(404).end()
  }

  if (req.method === 'GET') {
    const links = await getPaginated({
      cursor: cursor!,
      take: take!,
      tenantId,
    })

    return res.send(links)
  }

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { data } = linkBodySchema.parse(req.body)

  const createdLink = await create({
    ...data,
    tenantId,
  })

  if (!createdLink) {
    return res
      .status(500)
      .send({ error: 'Could not create link for this tenant' })
  }

  return res.status(201).end()
}
