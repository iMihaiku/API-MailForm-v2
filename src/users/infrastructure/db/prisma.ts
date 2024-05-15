import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection (){
  try {
    await prisma.$connect()
    console.log('Prisma system status: Connected')
  } catch (error) {
    console.log('Prisma connection error: ', error)
  }
}
testConnection().then(() => {
  prisma.$disconnect()
})
/* async function main() {
  console.log('Creating a new user')
  await prisma.user.create({
    data: {
      email: 'joseluisbpalencia1@gmail.com',
      name: 'Jose',
      password: '1234',
      posts: {
        create: { 
          title: 'Hello World',
          body: 'This is my first post',
          favorite: true
          }
         }
      }
  })
  const allUsers = await prisma.user.findMany()
  console.dir(allUsers, { depth: null })
} */