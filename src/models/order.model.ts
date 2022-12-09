import { model, Schema, Types } from "mongoose"
import { OrderStatus } from "../helpers/order-status"
import { Producto, ProductoSchema } from "./producto.model"

export interface LatLng {
  lat: string
  lng: string
}

export const LatLngSchema = new Schema<LatLng>({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
})

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
  totalprecio: number
  nombre: string
  direccion: string
  direccionLatLng: LatLng
  pagoId: string
  status: OrderStatus
  user: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<Order>(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    direccionLatLng: { type: LatLngSchema, required: true },
    pagoId: { type: String },
    totalprecio: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
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
