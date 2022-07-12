const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Usuario = require('../modelo/Usuario')
const { api } = require('./helpers')

describe.skip('Test de creacion de usuarios', () => {
  beforeEach(async () => {
    await Usuario.deleteMany({})
    const passHash = await bcrypt.hash('pwsd', 10)
    const usuario = new Usuario({
      username: 'Jose',
      name: 'Jose',
      password: passHash
    })
    await usuario.save()
  })
  test('Hay usuarios guardados', async () => {
    const res = await api.get('/usuarios')
    expect(res.body.length).toBeGreaterThan(0)
  })
  test('usuario especifico encontrado', async () => {
    const resUsuarios = await api.get('/usuarios')
    const idUsuarios = resUsuarios.body.map(usuario => usuario.id)
    const res = await api.get(`/usuarios/${idUsuarios[0]}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.username).toBe('Jose')
  })
  test('Probando a crear un nuevo usuario', async () => {
    const usuario = {
      username: 'Mihaiku',
      name: 'Jose',
      password: 'nuevaPass'
    }
    const res = await api.post('/usuarios')
      .send(usuario)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.username).toBe('Mihaiku')
  })
  test('Probando al fallo de insertar un usuario con el mismo username', async () => {
    const usuario = {
      username: 'Jose',
      name: 'Don Luis',
      password: 'nuevaPass'
    }
    const res = await api.post('/usuarios')
      .send(usuario)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  afterAll(() => {
    mongoose.connection.close()
  })
})
