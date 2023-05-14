import { ReactNode } from 'react'

interface ITenantLayoutProps {
  children: ReactNode
}

export default function TenantLayout({ children }: ITenantLayoutProps) {
  return (
    <main>
      <p>Tenant Layout</p>
      {children}
    </main>
  )
}
