'use client'

import { useState } from 'react'

import clsx from 'clsx'

import { ButtonGroup } from '~/components/ui/ButtonGroup'
import { Heading } from '~/components/ui/Heading'
import { Text } from '~/components/ui/Text'

import { CreateLinkForm } from '../components/Links/CreateLinkForm'
import { LinksListTable } from '../components/Links/LinksListTable'

interface ILinkProps {
  params: {
    tenantId: string
  }
}

export default function Links({ params }: ILinkProps) {
  const [toggleCreateLinkForm, setToggleCreateLinkForm] = useState(false)

  function handleToggleCreateLinkForm() {
    setToggleCreateLinkForm(!toggleCreateLinkForm)
  }

  return (
    <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
      <header className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
        <div className="min-w-max">
          <Heading asChild>
            <h1>Link management</h1>
          </Heading>
          <Text asChild>
            <h2>Easily manage your links around here</h2>
          </Text>
        </div>

        <ButtonGroup.Root className="w-full max-w-md">
          <ButtonGroup.Button
            className={clsx({ '!bg-gray-800': toggleCreateLinkForm })}
            onClick={handleToggleCreateLinkForm}
          >
            Criar Link
          </ButtonGroup.Button>
          <ButtonGroup.Button>Criar Grupo</ButtonGroup.Button>
        </ButtonGroup.Root>
      </header>

      {toggleCreateLinkForm ? (
        <CreateLinkForm tenantId={params.tenantId} />
      ) : (
        <LinksListTable tenantId={params.tenantId} />
      )}
    </div>
  )
}
