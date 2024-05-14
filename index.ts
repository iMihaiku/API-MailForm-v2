import express from 'express'
import env from 'dotenv'
import { PrismaClient } from '@prisma/client'

import handleErrors from './middlewares/handleErrors'
import notFound from './middlewares/notFound'
import messageRouter from './controllers/messageRouter'
import usersRouter from './controllers/usersRouter'

env.config()
const app = express()

const prisma = new PrismaClient()
async function main() {
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
}
// main()
app.use('/messages', messageRouter)
app.use('/users', usersRouter)
app.use(notFound)
app.use(handleErrors)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
