const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

const mensajesIniciales = [{
  asunto: 'Prueba de envio 1',
  contenido: 'Contenido de prueba',
  fecha: new Date()
},
{
  asunto: 'Prueba de envio 2',
  contenido: 'Sigue siendo malo a los videojuegos',
  fecha: new Date()
}]
const todoUsuariosDeMensajes = async () => {
  const res = await api.get('/api/mensajes')
  return {
    asunto: res.body.map(mensaje => mensaje.asunto),
    res
  }
}

module.exports = {
  mensajesIniciales,
  api,
  todoUsuariosDeMensajes
}
