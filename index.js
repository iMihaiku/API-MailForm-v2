require('dotenv').config()
require('./mongo')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const Mensaje = require('./modelo/Mensaje')
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
app.get('/api/mensajes', async (req, res, next) => {
  /* Mensaje.find({})
    .then(mensajes => { res.json(mensajes) })
    .catch(err => next(err)) */
  const mensajes = await Mensaje.find({})
  res.json(mensajes)
})
app.get('/api/mensajes/:id', (req, res, next) => {
  const { id } = req.params
  Mensaje.findById(id).then(mensaje => {
    return mensaje
      ? res.json(mensaje)
      : res.status(404).end()
  }).catch(err => { next(err) })
})
app.delete('/api/mensajes/:id', (req, res, next) => {
  const { id } = req.params
  Mensaje.findByIdAndDelete(id)
    .then(resultado => { res.status(204).end() })
    .catch(error => next(error))
})
app.put('/api/mensajes/:id', (req, res, next) => {
  const { id } = req.params
  const mensajeRecibido = req.body
  const mensaje = {
    usuario: mensajeRecibido.usuario,
    contenido: mensajeRecibido.contenido
  }

  Mensaje.findByIdAndUpdate(id, mensaje, { new: true })
    .then(resultado => { res.json(resultado) })
    .catch(err => { next(err) })
})
app.post('/api/mensajes', async (req, res, next) => {
  const mensajeRecibido = req.body

  if (!mensajeRecibido.contenido) {
    return res.status(400).json({
      error: 'se requiere un "contenido" para un mensaje completo'
    })
  }

  const mensaje = new Mensaje({
    usuario: mensajeRecibido.usuario,
    contenido: mensajeRecibido.contenido,
    fecha: new Date()
  })
  /* mensaje.save()
    .then(mensajeGuardado => { res.json(mensajeGuardado) })
    .catch(err => { next(err) }) */
  try {
    const mensajeGuardado = await mensaje.save()
    res.json(mensajeGuardado)
  } catch (ex) {

  }
})

app.use(notFound)
app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})
module.exports = { app, server }
