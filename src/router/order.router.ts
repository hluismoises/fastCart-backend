import { Router } from "express"
import auth from "../middlewares/token-validator"
import {
  nuevaOrden,
  obtenerOrden,
  crearPago,
  obtenerPago,
} from "../controllers/order.controller"

const router = Router()
router.use(auth)

router.post("/create", nuevaOrden)

router.get("/newOrderForCurrentUser", obtenerOrden)

router.post("/pay", crearPago)

router.get("/track/:id", obtenerPago)

export default router
