import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'

import { prisma } from '~/lib/prisma'

import { authOptions } from '../auth/[...nextauth]'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    const tenants = await prisma.tenant.findMany({
      where: {
        users: {
          some: {
            user_id: session.id,
          },
        },
      },
    })

    return res.send({
      content: {
        message:
          'This is protected content. You can access this content because you are signed in.',
        session,
        tenants,
      },
    })
  } else {
    return res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    })
  }
}
