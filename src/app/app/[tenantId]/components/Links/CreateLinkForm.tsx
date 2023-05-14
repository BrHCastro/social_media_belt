'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useSWRConfig } from 'swr'
import { z } from 'zod'

import { Heading } from '~/components/ui/Heading'
import { TextInput } from '~/components/ui/TextInput'
import { generateSlug } from '~/utils/generate-slug'

const createLinkFormSchema = z.object({
  internalName: z
    .string()
    .trim()
    .min(3, { message: 'Internal name should be bigger than 3 characters' }),
  publicName: z
    .string()
    .trim()
    .min(3, { message: 'Public name should be bigger than 3 characters' }),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Please enter a valid slug',
  }),
  destination: z.string().url({ message: 'Invalid url.' }),
})

type CreateLinkFormType = z.infer<typeof createLinkFormSchema>

interface ICreateLinkProps {
  tenantId: string
}

export function CreateLinkForm({ tenantId }: ICreateLinkProps) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkFormType>({
    resolver: zodResolver(createLinkFormSchema),
  })

  const { mutate } = useSWRConfig()

  async function handleCreateLink(formData: CreateLinkFormType) {
    try {
      await axios.post(`/api/${tenantId}/links`, {
        data: formData,
      })

      await mutate(`/api/${tenantId}/links`)

      reset()
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }

  function handleGenerateSlug() {
    const slug = generateSlug(getValues().publicName)
    setValue('slug', slug)
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateLink)}
      className="mt-24 p-4 container max-w-2xl mx-auto shadow-md md:w-3/4 border-t-2 border-purple-600 rounded-lg"
    >
      <Heading className="text-xl mt-4">Criar Link</Heading>

      <div className="mt-6 space-y-6 bg-white dark:bg-gray-800/5">
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3 text-black dark:text-white">
            Identificação
          </h2>
          <div className="max-w-sm mx-auto md:w-2/3 space-y-5">
            <TextInput.Root error={errors.internalName?.message}>
              <TextInput.Input
                placeholder="Nome Interno"
                {...register('internalName')}
              />
            </TextInput.Root>
            <TextInput.Root error={errors.publicName?.message}>
              <TextInput.Input
                placeholder="Nome Público"
                {...register('publicName')}
              />
            </TextInput.Root>
            <TextInput.Root error={errors.slug?.message}>
              <TextInput.Input placeholder="Slug" {...register('slug')} />
              <button
                type="button"
                className="text-xs text-green-600 border border-green-600 rounded-full px-2 focus:ring ring-purple-600 outline-none"
                onClick={handleGenerateSlug}
              >
                auto
              </button>
            </TextInput.Root>
          </div>
        </div>
        <hr className="border-gray-600" />
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3 text-black dark:text-white">
            Destino
          </h2>
          <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
            <TextInput.Root error={errors.destination?.message}>
              <TextInput.Input
                placeholder="https://..."
                {...register('destination')}
              />
            </TextInput.Root>
            <TextInput.Root>
              <TextInput.Input placeholder="TBD ..." />
            </TextInput.Root>
          </div>
        </div>
        <hr className="border-gray-600" />
        <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-4 h-10 flex items-center justify-center disabled:opacity-70 bg-blue-600 hover:[&:not(:disabled)]:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md outline-none ring-2 ring-offset-2 rounded-lg"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 rounded-full border-2 border-white border-l-transparent animate-spin" />
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
