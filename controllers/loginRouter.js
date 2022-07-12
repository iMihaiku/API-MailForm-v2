const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Usuario = require('../modelo/Usuario')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const usuario = await Usuario.findOne({ username })
  const passCorrecta = usuario === null
    ? false
    : await bcrypt.compare(password, usuario.password)
  if (!passCorrecta) {
    res.status(401).json({
      error: 'Credenciales incorrectas'
    })
  }
  const userToken = {
    id: usuario._id,
    username: usuario.username
  }
  const token = jwt.sign(
    userToken,
    process.env.SECRET
  )

  res.send({
    name: usuario.name,
    username: usuario.username,
    token
  })
})
module.exports = loginRouter
