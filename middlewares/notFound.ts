import type { Response } from 'express'

export default function notFoundResponse(res: Response): void {
  res.status(404).end()
}
