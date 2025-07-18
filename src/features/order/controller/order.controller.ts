import { Request, Response } from 'express'
import HTTP_STATUS from '@/globals/constants/http.constant'
import { orderService } from '../services/order.service'

class OrderController {
  public async read(req: Request, res: Response) {
    const orders = await orderService.read()

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all orders',
      data: orders
    })
  }

  public async readMyOrder(req: Request, res: Response) {
    const orders = await orderService.readMyOrders(req.currentUser)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all orders',
      data: orders
    })
  }

  public async readOne(req: Request, res: Response) {
    const order = await orderService.readOne(parseInt(req.params.id), req.currentUser)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get one order',
      data: order
    })
  }

  public async updateStatus(req: Request, res: Response) {
    const order = await orderService.updateStatus(parseInt(req.params.id), req.body.status)

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update status successfully',
      data: order
    })
  }
}

export const orderController: OrderController = new OrderController()
