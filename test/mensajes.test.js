const moongose = require('mongoose')
const { server } = require('../index')
const Mensaje = require('../modelo/Mensaje')
const { api, mensajesIniciales, todoUsuariosDeMensajes } = require('./helpers')

beforeEach(async () => {
  await Mensaje.deleteMany({})
  const mensajeObj = mensajesIniciales.map(mensaje => new Mensaje(mensaje))
  const promesa = mensajeObj.map(mensaje => mensaje.save())
  await Promise.all(promesa)
})
test('Mensajes devueltos como json', async () => {
  await api
    .get('/api/mensajes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Hay mas de 1 nota', async () => {
  const res = await api.get('/api/mensajes')
  expect(res.body).toHaveLength(2)
})
test('El usuario del mensaje existe', async () => {
  const { usuarios } = await todoUsuariosDeMensajes()
  expect(usuarios).toContain('Silverion')
})

test('Añadiendo una nota valida', async () => {
  const nuevoMensaje = {
    usuario: 'iMihaiku',
    contenido: 'Test de Post con supertest',
    fecha: new Date()
  }
  await api
    .post('/api/mensajes')
    .send(nuevoMensaje)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { usuarios } = await todoUsuariosDeMensajes()
  expect(usuarios).toContain('iMihaiku')
})
afterAll(() => {
  moongose.connection.close()
  server.close()
})
