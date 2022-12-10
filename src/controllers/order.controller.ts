import { Router } from "express"
import asyncHandler from "express-async-handler"
import { HTTP_BAD_REQUEST } from "../helpers/http-status"
import { OrderModel } from "../models/order.model"
import auth from "../middlewares/token-validator"

export const nuevaOrden = asyncHandler(async (req: any, res: any) => {
  const requestOrder = req.body

  if (requestOrder.items.length <= 0) {
    res.status(HTTP_BAD_REQUEST).send("El carrito esta vacio")
    return
  }

  await OrderModel.deleteOne({
    user: req.user.id,
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

async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
  })
}
