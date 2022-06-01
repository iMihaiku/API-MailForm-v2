module.exports = (error, req, res, next) => {
  console.error(error.name)
  if (error.name === 'CastError') {
    res.status(400).send({
      error: 'la id usada es incorrecta'
    })
  } else {
    res.status(500).end()
  }
}
