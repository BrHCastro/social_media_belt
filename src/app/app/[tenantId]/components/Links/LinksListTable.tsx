'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Link as LinkList } from '@prisma/client'
import axios, { AxiosError } from 'axios'
import { ChevronLeft, ChevronRight, Edit, Eye, Trash } from 'lucide-react'

import { useFetch } from '~/hooks/useFetch'

interface ILinksListTableProps {
  tenantId: string
}

type LinkListDataType = {
  data: LinkList[]
  nextLink: string
  prevLink: string
}

export function LinksListTable({ tenantId }: ILinksListTableProps) {
  const [cursor, setCursor] = useState('')
  const { data, mutate, error, isLoading } = useFetch<LinkListDataType>(
    `/api/${tenantId}/links`,
    {
      take: 5,
      cursor,
    },
  )

  useEffect(() => {
    mutate()
  }, [mutate, cursor])

  if (error) {
    notFound()
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  async function handleDeleteLink(linkId: string) {
    try {
      if (data?.data.length === 1) {
        setCursor(data.prevLink)
      }

      await axios.delete(`/api/${tenantId}/links/${linkId}`)
      await mutate()
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl leading-tight dark:text-white">Your links</h2>
        </div>

        {!data?.data?.length ? (
          <p className="text-white font-bold text-2xl text-center mt-20">
            No data available yet.
          </p>
        ) : (
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-600 dark:bg-gray-900 dark:text-white"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-600 dark:bg-gray-900 dark:text-white"
                    >
                      Destination
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-600 dark:bg-gray-900 dark:text-white"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((link) => {
                    return (
                      <tr key={link.id}>
                        <td className="text-left px-5 py-5 text-sm bg-white border-b border-gray-600 dark:bg-gray-800">
                          <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                            {link.internal_name} -{' '}
                            <small className="dark:text-gray-300">
                              {link.public_name}
                            </small>
                          </p>
                          <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                            {link.destination}
                          </p>
                        </td>
                        <td className="text-center px-5 py-5 text-sm bg-white border-b border-gray-600 dark:bg-gray-800">
                          <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                            {link.destination}
                          </p>
                        </td>
                        <td className="text-center px-5 py-5 text-sm bg-white border-b border-gray-600 dark:bg-gray-800">
                          <div className="flex items-center justify-center gap-6 w-full">
                            <a
                              href={link.destination}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="view"
                              className="text-cyan-500 hover:text-cyan-600"
                            >
                              <Eye />
                            </a>
                            <Link
                              href={`/${link.slug}`}
                              prefetch={false}
                              title="edit"
                              className="text-orange-500 hover:text-orange-600"
                            >
                              <Edit />
                            </Link>
                            <button
                              title="remove"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleDeleteLink(link.id)}
                            >
                              <Trash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="flex flex-col items-center px-5 py-5 bg-white dark:bg-gray-800 xs:flex-row xs:justify-between">
                <div className="flex items-center">
                  <button
                    type="button"
                    title="prev"
                    className="disabled:cursor-not-allowed disabled:opacity-50 w-full p-4 text-base text-gray-600 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                    disabled={!data.prevLink}
                    onClick={() => setCursor(data.prevLink)}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    title="next"
                    type="button"
                    className="disabled:cursor-not-allowed disabled:opacity-50 w-full p-4 text-base text-gray-600 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                    disabled={!data.nextLink}
                    onClick={() => setCursor(data.nextLink)}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
