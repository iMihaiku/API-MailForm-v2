const mensajeRouter = require('express').Router()
const Mensaje = require('../modelo/Mensaje')
const Usuario = require('../modelo/Usuario')
const usuarioExtraido = require('../middlewares/usuarioExtraido')

mensajeRouter.get('/', usuarioExtraido, async (req, res, next) => {
  const mensajes = await Mensaje.find({ usuario: { _id: req.userId } })
  res.json(mensajes)
})
mensajeRouter.get('/favoritos', usuarioExtraido, async (req, res, next) => {
  const mensajes = await Mensaje.find({ usuario: { _id: req.userId }, favorito: true })
  res.json(mensajes)
})
mensajeRouter.get('/:id', usuarioExtraido, (req, res, next) => {
  const { id } = req.params
  Mensaje.findById(id)
    .then((mensaje) => {
      return mensaje ? res.json(mensaje) : res.status(404).end()
    })
    .catch((err) => {
      next(err)
    })
})
mensajeRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params
  Mensaje.findByIdAndDelete(id)
    .then((res) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})
mensajeRouter.delete('/all', async (req, res, next) => {
  const mensajes = await Mensaje.find({})
  const ids = mensajes.map((mensaje) => mensaje.id)
  try {
    for (const id of ids) {
      await Mensaje.findByIdAndDelete(id)
    }
    res.end()
  } catch (error) {
    console.log(error)
  }
})

mensajeRouter.put('/:id', usuarioExtraido, async (req, res, next) => {
  const { id } = req.params
  const mensajeRecibido = req.body
  const mensaje = {
    asunto: mensajeRecibido.asunto,
    contenido: mensajeRecibido.contenido,
    leido: mensajeRecibido.leido,
    favorito: mensajeRecibido.favorito
  }
  Mensaje.findByIdAndUpdate(id, mensaje, { new: true })
    .then((resultado) => {
      res.json(resultado)
    })
    .catch((err) => {
      next(err)
    })
})
mensajeRouter.post('/:procedencia', usuarioExtraido, async (req, res, next) => {
  const { asunto, email, contenido } = req.body
  if (!contenido) {
    return res.status(400).json({
      error: 'se requiere un "contenido" para un mensaje completo'
    })
  }
  const idUsuario = req.idUsuario
  console.log('idUsuario', idUsuario);
  const usuarioActual = await Usuario.findById(idUsuario)
  const mensaje = new Mensaje({
    asunto,
    email,
    contenido,
    usuario: usuarioActual._id,
    procedencia: req.params.procedencia || 'Desconocida',
    fecha: new Date(),
    leido: false,
    favorito: false
  })
  try {
    const mensajeGuardado = await mensaje.save()
    usuarioActual.mensajes = usuarioActual.mensajes.concat(mensajeGuardado._id)
    await usuarioActual.save()

    res.json(mensajeGuardado)
  } catch (ex) {
    next(ex)
  }
})

module.exports = mensajeRouter
