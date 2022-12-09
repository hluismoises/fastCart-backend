import { Express, Request, Response } from "express"
import { PlanModel } from "../models/plan.model"

//Funciones

////Obtener todos los planes
export const obtenerPlanes = async (req: any, res: any) => {
  const planList = await PlanModel.find()

  if (!planList) {
    res.status(500).json({ success: false })
  }
  res.status(200).send(planList)
}

////Obtener un plan
export const obtenerPlan = async (req: any, res: any) => {
  const plan = await PlanModel.findById(req.params.id)

  if (!plan) {
    res
      .status(500)
      .json({ message: `Plan con el ID: ${req.params.id} no se encontro.` })
  }
  res.status(200).send(plan)
}

////Crear un plan
export const crearPlan = async (req: any, res: any) => {
  const plan = new PlanModel({
    id: "",
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
  })

  plan
    .save()
    .then((saveResponse: any) => {
      res.send(saveResponse)
      res.end()
    })
    .catch((error) => {
      res.send({ message: "Hubo un error al guardar", error }) // shorthand
      res.end()
    })
}

////Actualizar un plan
export const actualizarPlan = async (req: any, res: any) => {
  const plan = await PlanModel.findByIdAndUpdate(
    req.params.id,
    {
      nombre: req.body.nombre,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
    },
    { new: true }
  )

  if (!plan) return res.status(400).send("Plan no actualizado")

  res.send(plan)
}

////Eliminar un plan
export const eliminarPlan = (req: any, res: any) => {
  PlanModel.findByIdAndRemove(req.params.id)
    .then((plan) => {
      if (plan) {
        return res
          .status(200)
          .json({ success: true, message: "Plan eliminado!" })
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Plan no encontrado!" })
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err })
    })
}
