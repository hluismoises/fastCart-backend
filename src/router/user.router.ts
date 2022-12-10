import { Router } from "express"
import { login, registro, obtenerUsuario } from "../controllers/user.controller"

const router = Router()

router.post("/login", login)
router.post("/register", registro)
router.get("/:userId", obtenerUsuario)

export default router
