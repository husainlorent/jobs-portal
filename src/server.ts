import express, { Application, Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import appRoutes from './globals/routes/appRoutes'
import { error } from 'console'
import { CustomError, NotFoundException } from './globals/cores/error.core'
import HTTP_STATUS from './globals/constants/http.constant'
import cookieParser from 'cookie-parser'

class Server {
  private app: Application

  constructor() {
    this.app = express()
  }

  public start(): void {
    this.setupMiddleware()
    this.setupRoutes()
    this.setupGlobalError()
    this.listenServer()
  }

  private setupMiddleware(): void {
    this.app.use(express.json())
    this.app.use(cookieParser())
  }

  private setupRoutes(): void {
    appRoutes(this.app)
  }

  private setupGlobalError(): void {
    this.app.all('*', (req, res, next) => {
      next(new NotFoundException(`The URL ${req.originalUrl} not found with method ${req.method}`))
    })
    this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          message: error.message
        })
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER).json({
        message: 'Internal server error'
      })
    })
  }

  public listenServer() {
    const port = process.env.PORT || 5005

    this.app.listen(port, () => {
      console.log(`Connected to server whith port ${port}`)
    })
  }
}

export default Server
