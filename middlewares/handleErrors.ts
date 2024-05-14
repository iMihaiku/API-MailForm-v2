import { Request, Response } from 'express'

type ErrorHandler = (response: Response, error?: Error) => Response

const ERROR_HANDLER: Record<string, ErrorHandler> = {
  CastError: (response, error) =>
    response.status(400).send({ error: 'la id usada es incorrecta' }),
  ValidationError: (response, error) =>
    response.status(409).send({ error: error?.message }),
  JsonWebTokenError: (response, error) =>
    response.status(401).json({ error: 'token invalid or missing' }),
  TokenExpiredError: (response, error) =>
    response.status(401).json({ error: 'Token just expired' }),
  defaultError: (response) => response.status(500).end()
}
export default function errorHandlerFunction(
  error: Error,
  req: Request,
  res: Response
): void {
  console.error(error.name)
  const handler =
    error.name in ERROR_HANDLER
      ? ERROR_HANDLER[error.name]
      : ERROR_HANDLER.defaultError
  handler(res, error)
}
