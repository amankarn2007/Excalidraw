//import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
////@ts-ignore
//import { PrismaClient } from "./generated/prisma/client.ts";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
//const prisma = new PrismaClient({ adapter })

//export { prisma }


//@ts-ignore
import { PrismaClient } from "./generated/prisma/client.ts"

const globalForPrisma = globalThis as any
export const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma