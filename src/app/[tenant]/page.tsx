import { notFound } from 'next/navigation'

import { findTenantBySlug } from '~/services/tenant'

interface ITenantPageProps {
  params: {
    tenant: string
  }
}

export default async function TenantPage({ params }: ITenantPageProps) {
  const tenant = await findTenantBySlug(params.tenant)

  if (!tenant) {
    notFound()
  }

  return <h1>Tenant: {JSON.stringify(tenant, null, 2)}</h1>
}
