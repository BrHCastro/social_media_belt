'use client'

import { ReactNode } from 'react'

import { Slot, SlotProps } from '@radix-ui/react-slot'
import clsx from 'clsx'

interface ITextProps extends SlotProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

export function Text({ asChild, className, children, ...props }: ITextProps) {
  const Component = asChild ? Slot : 'p'

  return (
    <Component className={clsx('text-gray-400 text-md', className)} {...props}>
      {children}
    </Component>
  )
}
