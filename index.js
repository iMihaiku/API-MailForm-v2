const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let mensajes = [
  {
    id: 1,
    usuario: 'UsuarioDePrueba1',
    contenido: 'Contenido de prueba 1'
  },
  {
    id: 2,
    usuario: 'UsuarioDePrueba2',
    contenido: 'Contenido de prueba 2'
  },
  {
    id: 3,
    usuario: 'UsuarioDePrueba3z',
    contenido: 'Contenido de prueba 3'
  },
  {
    id: 4,
    usuario: 'UsuarioDePrueba4',
    contenido: 'Contenido de prueba 4'
  }
]

app.get('/', (req, res) => {
  res.send('Bienvenido')
})

app.get('/api/mensajes', (req, res) => {
  res.json(mensajes)
})
app.get('/api/mensajes/:id', (req, res) => {
  const id = Number(req.params.id)
  const mensaje = mensajes.find(mensaje => mensaje.id === id)
  res.json(mensaje)
})
app.delete('/api/mensajes/:id', (req, res) => {
  const id = Number(req.params.id)
  mensajes = mensajes.filter(mensaje => mensaje.id !== id)
  res.status(204).end()
})
app.post('/api/mensajes', (req, res) => {
  const mensaje = req.body
  const maxId = Math.max(...(mensajes.map(mensaje => mensaje.id)))
  const nuevoMensaje = {
    id: maxId + 1,
    usuario: mensaje.usuario,
    contenido: mensaje.contenido
  }
  mensajes = [...mensajes, nuevoMensaje]
  res.json(nuevoMensaje)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})
