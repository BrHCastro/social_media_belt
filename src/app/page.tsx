'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { Github } from 'lucide-react'

import { Text } from '~/components/ui/Text'

export default function Home() {
  const { data } = useSession()

  return (
    <div className="flex flex-col gap-3 p-8">
      {!data ? (
        <button
          className="self-start flex items-center gap-2 border-2 border-gray-400 px-2 py-px rounded-md"
          onClick={() => signIn('github', { callbackUrl: '/app' })}
        >
          <Github />
          Sign in with GitHub
        </button>
      ) : (
        <div className="flex items-start gap-2">
          <Image
            src={String(data.user?.image)}
            alt={String(data.user?.name)}
            priority
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <Text className="!text-gray-800 font-bold text-xl" asChild>
              <h2>{data.user?.name}</h2>
            </Text>
            <small>{data.user?.email}</small>
          </div>
          <button
            className="border-2 border-gray-400 px-4 py-px rounded-md"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}

      <div className="flex flex-col items-start gap-1">
        <Link
          className="text-cyan-400 hover:text-cyan-600 hover:underline transition-all"
          href="/app"
        >
          Home Tenant
        </Link>
      </div>
    </div>
  )
}
