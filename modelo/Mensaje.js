const { Schema, model } = require('mongoose')

const mensajeSchema = new Schema({
  usuario: String,
  contenido: String,
  fecha: Date
})

mensajeSchema.set('toJSON', {
  transform: (document, returnedObjext) => {
    returnedObjext.id = returnedObjext._id
    delete returnedObjext._id
    delete returnedObjext.__v
  }
})

const Mensaje = model('Mensaje', mensajeSchema)

module.exports = Mensaje
