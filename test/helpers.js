const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

const mensajesIniciales = [{
  usuario: 'Mihaiku',
  contenido: 'Contenido de prueba',
  fecha: new Date()
},
{
  usuario: 'Silverion',
  contenido: 'Sigue siendo malo a los videojuegos',
  fecha: new Date()
}]
const todoUsuariosDeMensajes = async () => {
  const res = await api.get('/api/mensajes')
  return {
    usuarios: res.body.map(mensaje => mensaje.usuario),
    res
  }
}

module.exports = {
  mensajesIniciales,
  api,
  todoUsuariosDeMensajes
}
