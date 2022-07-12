const moongose = require('mongoose')
const Mensaje = require('../modelo/Mensaje')
const Usuario = require('../modelo/Usuario')
const bcrypt = require('bcrypt')
const { api, mensajesIniciales, todoUsuariosDeMensajes } = require('./helpers')

describe('Test de manejo de mensajes', () => {
  beforeEach(async () => {
    await Mensaje.deleteMany({})
    await Usuario.deleteMany({})

    const mensajeObj = mensajesIniciales.map(mensaje => new Mensaje(mensaje))
    const promesa = mensajeObj.map(mensaje => mensaje.save())
    await Promise.all(promesa)

    const passHash = await bcrypt.hash('pwsd', 10)
    const usuario = new Usuario({
      username: 'Mensajero',
      name: 'Jose',
      password: passHash
    })
    await usuario.save()
  })
  test('Mensajes devueltos como json', async () => {
    await api
      .get('/api/mensajes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Hay mas de 1 mensaje', async () => {
    const res = await api.get('/api/mensajes')
    expect(res.body).toHaveLength(2)
  })
  test('El usuario del mensaje existe', async () => {
    const { asunto } = await todoUsuariosDeMensajes()
    expect(asunto).toContain('Prueba de envio 1')
  })

  test('Añadiendo una nota valida', async () => {
    const usuarios = await Usuario.find({})
    const nuevoMensaje = {
      asunto: 'iMihaiku',
      email: 'correo de prueba',
      contenido: 'Test de Post con supertest',
      usuario: usuarios[0]._id
    }
    await api
      .post('/api/mensajes')
      .send(nuevoMensaje)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { asunto } = await todoUsuariosDeMensajes()
    expect(asunto).toContain('iMihaiku')
  })
  afterAll(() => {
    moongose.connection.close()
  })
})
