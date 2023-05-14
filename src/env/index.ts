import { z } from 'zod'

/** Validate all envs. */

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  API_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables.', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
