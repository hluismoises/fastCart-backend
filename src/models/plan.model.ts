import { Schema, model } from "mongoose"

export interface Plan {
  id: string
  nombre: string
  precio: number
  descripcion: string
}

export const PlanSchema = new Schema<Plan>({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
})

PlanSchema.virtual("id").get(function () {
  return this._id.toHexString()
})

PlanSchema.set("toJSON", {
  virtuals: true,
})

export const PlanModel = model<Plan>("plan", PlanSchema)
