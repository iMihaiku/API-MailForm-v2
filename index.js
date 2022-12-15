require('dotenv').config()
require('./mongo')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const mensajeRouter = require('./controllers/mensajeRouter')
const usuariosRouter = require('./controllers/usuariosRouter')
const loginRouter = require('./controllers/loginRouter')
const handleErrors = require('./middlewares/handleErrors')
const notFound = require('./middlewares/notFound')

/**
 * Aqui voy a añadir Sentry solo para experimentar ya que el bootcamp que
 * estoy siguiendo lo explica, pero no es necesario
 */
Sentry.init({
  dsn: 'https://325460ac6e984389a2b0dfd7f44e3cf5@o1270443.ingest.sentry.io/6461277',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0
})
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

/**
 * Fin de la integracion de Sentry
 */

app.get('/', (req, res) => {
  res.send('Bienvenido')
})

app.use('/api/mensajes', mensajeRouter)
app.use('/usuarios', usuariosRouter)
app.use('/login', loginRouter)
app.use(notFound)
app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

const PORT = process.env.PORT || 3005
let server
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
  })
}

module.exports = { app, server }
