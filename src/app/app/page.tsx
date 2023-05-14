'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import useSWR from 'swr'

interface IDataProps {
  content: {
    message: string
    session: {
      user: {
        name: string
        email: string
        image: string
      }
      expires: string
      id: string
    }
    tenants: [
      {
        id: string
        name: string
        slug: string
        plan: string
        image: string
        created_at: string
      },
    ]
  }
}

export default function AppHome() {
  const { data, error, isLoading } = useSWR<IDataProps>(
    '/api/tenants',
    async (url) => {
      const response = await fetch(url, {
        cache: 'no-store',
      })

      return await response.json()
    },
  )
  const router = useRouter()

  useEffect(() => {
    if (data?.content?.tenants?.length! <= 1) {
      router.push(`/app/${data?.content.tenants.shift()?.id}`)
    }
  }, [data, router])

  if (isLoading) {
    return (
      <div className="w-10 h-10 border border-gray-300 border-l-gray-800 rounded-full animate-spin" />
    )
  }

  if (!data?.content?.tenants?.length) {
    return (
      <button onClick={() => signIn('github')}>
        Faça o login para continuar
      </button>
    )
  }

  if (error) {
    return <p>Houve um erro.</p>
  }

  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold">My Tenants</h2>
      <p className="text-gray-700">{data?.content.message}</p>

      <header className="my-12 flex items-center gap-2">
        <Image
          src={String(data?.content.session.user.image)}
          alt=""
          priority
          width={50}
          height={50}
          className="rounded-full"
        />

        <strong className="text-2xl">{data?.content.session.user.name}</strong>
      </header>

      <div className="flex flex-col gap-2 items-start">
        {data?.content.tenants.map((tenant) => {
          return (
            <Link
              href={`app/${tenant.id}`}
              className="inline-flex gap-2 focus:ring-2 ring-cyan-500"
              key={tenant.id}
            >
              <Image
                src={String(tenant.image)}
                alt=""
                priority
                width={50}
                height={50}
                className="object-cover aspect-square"
              />
              <div>
                <p>Name: {tenant.name}</p>
                <p>Plan: {tenant.plan}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
