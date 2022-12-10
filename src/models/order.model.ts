import { model, Schema, Types } from "mongoose"
import { Producto, ProductoSchema } from "./producto.model"

export interface OrderItem {
  producto: Producto
  precio: number
  cantidad: number
}

export const OrderItemSchema = new Schema<OrderItem>({
  producto: { type: ProductoSchema, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
})

export interface Order {
  id: string
  items: OrderItem[]
  totalPrice: number
  name: string
  address: string
  user: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<Order>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

export const OrderModel = model("order", orderSchema)
