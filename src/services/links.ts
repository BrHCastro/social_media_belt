import { Link, Prisma } from '@prisma/client'

import { prisma } from '~/lib/prisma'

type GetPaginatedRequire = {
  tenantId: string
  cursor: string
  take: number
}

type CreateLinkRequire = {
  tenantId: string
  internalName: string
  publicName: string
  slug: string
  destination: string
}

export async function getPaginated({
  tenantId,
  cursor,
  take,
}: GetPaginatedRequire) {
  const args: Prisma.LinkFindManyArgs = {
    where: {
      tenant_id: tenantId,
    },
    orderBy: {
      id: 'asc',
    },
    take,
  }

  if (cursor) {
    args.cursor = {
      id: cursor,
    }
  }

  const links = await prisma.link.findMany(args)

  if (!links.length) {
    return {
      data: links,
      nextLink: '',
      prevLink: '',
    }
  }

  const nextLink = await prisma.link.findFirst({
    select: {
      id: true,
    },
    where: {
      id: {
        gt: links[links.length - 1].id,
      },
    },
    orderBy: {
      id: 'asc',
    },
  })
  const prevLink = await prisma.link.findMany({
    select: {
      id: true,
    },
    where: {
      id: {
        lt: links[0].id,
      },
    },
    orderBy: {
      id: 'desc',
    },
    take,
  })

  return {
    data: links,
    nextLink: nextLink?.id || '',
    prevLink: prevLink[prevLink.length - 1]?.id || '',
  }
}

export async function create(data: CreateLinkRequire): Promise<Link> {
  return await prisma.link.create({
    data: {
      tenant_id: data.tenantId,
      public_name: data.publicName,
      internal_name: data.internalName,
      destination: data.destination,
      slug: data.slug,
    },
  })
}

export async function findLinkBySlug(
  slug: string,
  tenantId: string,
): Promise<Partial<Link> | null> {
  const link = await prisma.link.findFirst({
    select: {
      id: true,
      destination: true,
    },
    where: {
      slug,
      tenant_id: tenantId,
    },
  })

  return link
}
