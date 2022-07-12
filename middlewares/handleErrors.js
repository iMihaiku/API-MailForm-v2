const ERRRO_HANDLERS = {
  CastError: (response, error) =>
    response.status(400).send({ error: 'la id usada es incorrecta' }),
  ValidationError: (response, error) =>
    response.status(409).send({ error: error.message }),
  JsonWebTokenError: (response, error) =>
    response.status(401).json({ error: 'token invalid or missing' }),
  TokenExpiredError: (response, error) =>
    response.status(401).json({ error: 'Token just expired' }),
  defaultError: response => response.status(500).end()
}
module.exports = (error, req, res, next) => {
  console.error(error.name)
  const handler = ERRRO_HANDLERS[error.name] || ERRRO_HANDLERS.defaultError
  handler(res, error)
}
