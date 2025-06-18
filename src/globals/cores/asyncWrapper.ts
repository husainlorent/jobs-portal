import { NextFunction, Request, Response } from 'express'

function asyncWrapper(callback: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next)
  }
}

export default asyncWrapper
