import Link, { LinkProps } from 'next/link'
import { ComponentType, ElementRef, forwardRef } from 'react'

import { LucideProps } from 'lucide-react'

interface INavLinkProps extends LinkProps {
  children: string

  /**
   * Enter any react component from the **lucide-react** library
   * @exemple \
   * icon={LayoutDashboard}
   */
  icon: ComponentType<LucideProps>

  /**
   * Validates if the link belongs to the current page (Boolean)
   * @exemple \
   * isActive={activePath === '/home'}
   */
  isActive: boolean
}

/**
 * @param
 * children - Title for the link (String)
 * @param
 * icon - Icon component (ComponentType / lucide-react)
 * @param
 * isActive - Validates if the link belongs to the current page (Boolean)
 */

export const NavLink = forwardRef<ElementRef<typeof Link>, INavLinkProps>(
  ({ children, icon: Icon, isActive, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        data-active={isActive}
        className="flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-400 dark:text-white data-[active=true]:text-gray-800 transition-colors duration-200 border-l-4 border-transparent data-[active=true]:border-purple-500 hover:text-gray-800 data-[active=true]:dark:bg-purple-500/5"
        {...props}
      >
        <Icon width={20} height={20} />
        <span className="mx-2 text-sm font-normal">{children}</span>
      </Link>
    )
  },
)
NavLink.displayName = 'NavLink.Root'
