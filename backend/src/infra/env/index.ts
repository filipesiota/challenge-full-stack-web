import { config } from 'dotenv'
import { z } from 'zod'

config()

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test', override: true })
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['production', 'development', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', z.treeifyError(_env.error))

  throw new Error('Invalid environment variables')
}

export const env = _env.data
