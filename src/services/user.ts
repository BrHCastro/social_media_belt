import { UsersOnTenants } from '@prisma/client'

import { prisma } from '~/lib/prisma'

type CheckTenantPermissionResponse = {
  userOnTenant: UsersOnTenants | null
  isValid: boolean
}

export async function checkTenantPermission(
  userId: string,
  tenantId: string,
): Promise<CheckTenantPermissionResponse> {
  const userOnTenant = await prisma.usersOnTenants.findUnique({
    where: {
      user_id_tenant_id: {
        user_id: userId,
        tenant_id: tenantId,
      },
    },
  })

  if (!userOnTenant) {
    return {
      userOnTenant,
      isValid: false,
    }
  }

  return {
    userOnTenant,
    isValid: true,
  }
}
