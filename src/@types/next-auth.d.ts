import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface DefaultSession {
    id: string
  }
}