import { Router } from "express"
import { login, registro } from "../controllers/user.controller"

const router = Router()

router.post("/login", login)
router.post("/register", registro)

export default router
