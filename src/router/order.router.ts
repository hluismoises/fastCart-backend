import { Router } from "express"
import auth from "../middlewares/token-validator"
import { nuevaOrden, obtenerOrden } from "../controllers/order.controller"

const router = Router()
router.use(auth)

router.post("/create", nuevaOrden)

router.get("/newOrderForCurrentUser", obtenerOrden)

export default router
