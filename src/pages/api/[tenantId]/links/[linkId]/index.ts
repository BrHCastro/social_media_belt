import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'

import { z } from 'zod'

import { prisma } from '~/lib/prisma'
import { checkTenantPermission } from '~/services/user'

import { authOptions } from '../../../auth/[...nextauth]'

const linkQuerySchema = z.object({
  linkId: z.string(),
  tenantId: z.string(),
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { linkId, tenantId } = linkQuerySchema.parse(req.query)

  if (req.method !== 'DELETE') {
    return res.status(405).end()
  }

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

  await prisma.link.delete({
    where: {
      id: linkId,
    },
  })

  return res.status(204).end()
}
