import { defineConfig } from '@prisma/config'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Force load .env from the current folder (packages/db/.env)
dotenv.config({ path: resolve(__dirname, '.env') })

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
})