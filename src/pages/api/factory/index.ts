// import { NextApiRequest, NextApiResponse } from 'next'

// import { Link } from '@prisma/client'

// import { prisma } from '~/lib/prisma'

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   async function generateLink(i: number) {
//     return await prisma.link.create({
//       data: {
//         tenant_id: '1643a943-eb3c-4bb4-9fc8-b8436105ec0a',
//         public_name: `public name${i.toString().padStart(2, '0')}`,
//         internal_name: `internal name${i.toString().padStart(2, '0')}`,
//         destination: `https://destination${i.toString().padStart(2, '0')}.com`,
//         slug: `internal-name${i.toString().padStart(2, '0')}`,
//       },
//     })
//   }

//   const result: Link[] = []

//   for (let i = 0; i <= 20; i++) {
//     const createdLink = await generateLink(i)

//     result.push(createdLink)
//   }

//   return res.status(201).send(result)
// }
