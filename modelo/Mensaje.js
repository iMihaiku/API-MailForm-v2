const { Schema, model } = require('mongoose')

const mensajeSchema = new Schema({
  asunto: String,
  email: String,
  contenido: String,
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  procedencia: String,
  fecha: Date,
  leido: Boolean,
  favorito: Boolean
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
