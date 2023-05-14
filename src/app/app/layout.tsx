import { ReactNode } from 'react'

interface IAppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: IAppLayoutProps) {
  return <main>{children}</main>
}
