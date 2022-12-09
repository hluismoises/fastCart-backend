import { Router } from "express"
import {
  obtenerPlanes,
  obtenerPlan,
  crearPlan,
  actualizarPlan,
  eliminarPlan,
} from "../controllers/plan.controller"

const router = Router()

//Funciones
router.get("/", obtenerPlanes)
router.get("/:id", obtenerPlan)
router.post("/", crearPlan)
router.put("/:id", actualizarPlan)
router.delete("/:id", eliminarPlan)

export default router
