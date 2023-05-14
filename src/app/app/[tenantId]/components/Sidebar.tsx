'use client'

import { usePathname } from 'next/navigation'

import { LayoutDashboard, Folder, MessageCircle, Link } from 'lucide-react'

import { NavLink } from './NavLink'

interface ISidebarProps {
  tenantId: string | undefined
}

export function Sidebar({ tenantId }: ISidebarProps) {
  const activePath = usePathname()

  return (
    <div className="relative hidden h-screen shadow-lg lg:block w-80">
      <div className="h-full bg-white dark:bg-gray-700">
        <div className="flex items-center justify-start pt-6 ml-8">
          <p className="text-xl font-bold dark:text-white">Plannifer</p>
        </div>
        <nav className="mt-6">
          <div>
            <NavLink
              href={`/app/${tenantId}`}
              isActive={activePath === `/app/${tenantId}`}
              icon={LayoutDashboard}
            >
              Dashboard
            </NavLink>
            <NavLink
              href={`/app/${tenantId}/links`}
              isActive={activePath === `/app/${tenantId}/links`}
              icon={Link}
            >
              Links
            </NavLink>
            <NavLink href="/" isActive={false} icon={Folder}>
              Resources
            </NavLink>
            <NavLink href="/" isActive={false} icon={MessageCircle}>
              Store feedback
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  )
}
