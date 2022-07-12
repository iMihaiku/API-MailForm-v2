const { model, Schema } = require('mongoose')

const usuarioSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  name: String,
  mensajes: [{
    type: Schema.Types.ObjectId,
    ref: 'Mensaje'
  }],
  password: String
})

usuarioSchema.set('toJSON', {
  transform: (document, returnedObjext) => {
    returnedObjext.id = returnedObjext._id
    delete returnedObjext._id
    delete returnedObjext.__v
    delete returnedObjext.password
  }
})

const Usuario = model('Usuario', usuarioSchema)
module.exports = Usuario
