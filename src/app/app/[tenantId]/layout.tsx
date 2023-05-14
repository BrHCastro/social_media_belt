import { ReactNode } from 'react'

import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

interface ITenantLayoutProps {
  children: ReactNode
  params: {
    tenantId: string
  }
}

export default function TenantLayout({ children, params }: ITenantLayoutProps) {
  return (
    <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <Sidebar tenantId={params.tenantId} />
        <div className="flex flex-col w-full">
          <Header />

          {children}
        </div>
      </div>
    </main>
  )
}
