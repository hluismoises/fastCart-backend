import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"

import { dbConnect } from "./database/database"
import routerPlanes from "./router/plan.router"
import routerProductos from "./router/productos.router"
import routerOrdenes from "./router/order.router"
import routerUser from "./router/user.router"

// Crear el servidor de express
dotenv.config()
const app: Express = express()
app.use(express.json())

// CORS
app.use(cors())
app.options("*", cors())

//Base de datos
dbConnect()

// Directorio Público
app.use(express.static("public"))

// Lectura y parseo del body
app.use(express.json())

//Rutas
app.use("/api/planes", routerPlanes)
app.use("/api/productos", routerProductos)
app.use("/api/orders", routerOrdenes)
app.use("/api/users", routerUser)
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server......")
})

//// Escuchar peticiones
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port)
})
