import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
//@ts-ignore
import { PrismaClient } from './generated/prisma'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Agar 'db' folder ke andar hi .env hai, toh use resolve(__dirname, '../.env')
dotenv.config({ path: resolve(__dirname, '../.env') })

const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString === "undefined") {
    console.error("❌ ERROR: DATABASE_URL is undefined. Check your .env path!");
}

const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool) 

export const prismaClient = new PrismaClient({ adapter })