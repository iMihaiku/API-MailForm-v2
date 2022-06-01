const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

mongoose.connect(connectionString)
  .then(() => { console.log('Conectado a la base de datos') })
  .catch(err => { console.log(err) })
/*
const mensaje = new Mensaje({
  usuario: 'Mihaiku',
  contenido: 'El primer mensaje de mi API',
  fecha: new Date()
})

mensaje.save()
  .then(resultado => {
    console.log(resultado)
  }).catch(error => {
    console.error(error)
  })
*/
