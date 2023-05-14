import { Tenant } from '@prisma/client'

import { prisma } from '~/lib/prisma'

export async function findTenantBySlug(
  slug: string,
): Promise<Partial<Tenant> | null> {
  const tenant = await prisma.tenant.findFirst({
    select: {
      id: true,
      name: true,
    },
    where: {
      slug,
    },
  })

  return tenant
}
