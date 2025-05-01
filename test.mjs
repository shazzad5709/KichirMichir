// test-connection.ts
import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],  // enable client-level logging
  })
  try {
    await prisma.$connect()           // opens the connection
    console.log('✅ Connected to MongoDB Atlas!')
    // run a simple query against one of your models:
    const anyUser = await prisma.user.findFirst()
    console.log('Sample query succeeded:', anyUser)
  } catch (e) {
    console.error('❌ Connection or query failed:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
