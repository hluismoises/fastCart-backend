import { Router } from "express"
import asyncHandler from "express-async-handler"
import { HTTP_BAD_REQUEST } from "../helpers/http-status"
import { OrderStatus } from "../helpers/order-status"
import { OrderModel } from "../models/order.model"
import auth from "../middlewares/token-validator"

export const nuevaOrden = asyncHandler(async (req: any, res: any) => {
  const requestOrder = req.body

  if (requestOrder.items.length <= 0) {
    res.status(HTTP_BAD_REQUEST).send("Cart Is Empty!")
    return
  }

  await OrderModel.deleteOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  })

  const newOrder = new OrderModel({ ...requestOrder, user: req.user.id })
  await newOrder.save()
  res.send(newOrder)
})

export const obtenerOrden = asyncHandler(async (req: any, res) => {
  const order = await getNewOrderForCurrentUser(req)
  if (order) res.send(order)
  else res.status(HTTP_BAD_REQUEST).send()
})

export const crearPago = asyncHandler(async (req: any, res) => {
  const { paymentId } = req.body
  const order = await getNewOrderForCurrentUser(req)
  if (!order) {
    res.status(HTTP_BAD_REQUEST).send("Order Not Found!")
    return
  }

  order.pagoId = paymentId
  order.status = OrderStatus.PAYED
  await order.save()

  res.send(order._id)
})

export const obtenerPago = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
  res.send(order)
})

async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  })
}
