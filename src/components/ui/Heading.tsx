'use client'

import { ReactNode } from 'react'

import { Slot, SlotProps } from '@radix-ui/react-slot'
import clsx from 'clsx'

interface IHeadingProps extends SlotProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

export function Heading({
  asChild,
  className,
  children,
  ...props
}: IHeadingProps) {
  const Component = asChild ? Slot : 'h2'

  return (
    <Component
      className={clsx(
        'text-4xl font-semibold text-gray-800 dark:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
