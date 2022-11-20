const usuariosRouter = require('express').Router()
const Usuario = require('../modelo/Usuario')
const bcrypt = require('bcryptjs')

usuariosRouter.get('/', async (req, res, next) => {
  const usuarios = await Usuario.find({})
  res.json(usuarios)
})
usuariosRouter.get('/:id', async (req, res, next) => {
  const usuario = await Usuario.findById(req.params.id)
  res.json(usuario)
})
usuariosRouter.post('/registro', async (req, res, next) => {
  try {
    const { username, name, password } = req.body
    const passHash = await bcrypt.hash(password, 10)
    const usuario = new Usuario({
      username,
      name,
      password: passHash
    })
    const usuarioGuardado = await usuario.save()
    res.json(usuarioGuardado)
  } catch (error) {
    res.status(400).json({ error: 'El nombre de usuario ya existe' })
  }
})
module.exports = usuariosRouter
