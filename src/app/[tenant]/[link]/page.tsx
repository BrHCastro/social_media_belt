import { notFound, redirect } from 'next/navigation'

import { findLinkBySlug } from '~/services/links'
import { findTenantBySlug } from '~/services/tenant'

interface ILinkPageProps {
  params: {
    tenant: string
    link: string
  }
}

export default async function LinkPage({ params }: ILinkPageProps) {
  const tenant = await findTenantBySlug(params.tenant)

  if (!tenant) {
    notFound()
  }

  const link = await findLinkBySlug(params.link, tenant?.id!)

  if (!link) {
    notFound()
  }

  // TODO: optionally let the user choose the type of redirection.

  redirect(link.destination!)

  const data = {
    tenant,
    link,
  }

  return <h1>{JSON.stringify(data, null, 2)}</h1>
}
