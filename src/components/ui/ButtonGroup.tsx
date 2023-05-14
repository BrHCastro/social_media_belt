import { ReactNode } from 'react'

import { Slot, SlotProps } from '@radix-ui/react-slot'
import clsx from 'clsx'

interface IGroupRoot {
  children: ReactNode
  className?: string
}

function Group({ children, className }: IGroupRoot) {
  return (
    <div
      className={clsx(
        'flex items-center gap-px rounded-md overflow-hidden border dark:border-gray-500 dark:bg-gray-500',
        className,
      )}
    >
      {children}
    </div>
  )
}
Group.displayName = 'ButtonGroup.Root'

interface IButtonProps extends SlotProps {
  children: ReactNode
  className?: string
  asChild?: boolean
}

function Button({ children, className, asChild, ...props }: IButtonProps) {
  const Component = asChild ? Slot : 'button'
  return (
    <Component
      className={clsx(
        'w-full px-4 py-2 text-base font-medium text-black bg-white dark:text-gray-100 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
Button.displayName = 'ButtonGroup.Button'

export const ButtonGroup = {
  Root: Group,
  Button,
}
