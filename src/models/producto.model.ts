import { Schema, model } from "mongoose"

export interface Producto {
  id: string
  nombre: string
  precio: number
  empresas: string[]
  favorito: boolean
  imageUrl: string
  categorias: string[]
  descripcion: string
}

export const ProductoSchema = new Schema<Producto>(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    empresas: { type: [String] },
    favorito: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    categorias: { type: [String], required: true },
    descripcion: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)

export const ProductoModel = model<Producto>("producto", ProductoSchema)
