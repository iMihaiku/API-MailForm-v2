import express from 'express'
import env from 'dotenv'
import './users/infrastructure/db/prisma'
import handleErrors from './middlewares/handleErrors'
import notFound from './middlewares/notFound'
import userRouter from './users/infrastructure/route/user.route'

env.config()
const app = express()

app.use(express.json())

// app.use('/messages', messageRouter)
app.use('/users', userRouter)
app.use(notFound)
app.use(handleErrors)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
