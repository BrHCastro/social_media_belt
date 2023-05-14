'use client'

import {
  SessionProvider as Provider,
  SessionProviderProps,
} from 'next-auth/react'
import { ReactNode } from 'react'

interface ISessionProviderProps extends SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({ children, ...props }: ISessionProviderProps) {
  return <Provider {...props}>{children}</Provider>
}
