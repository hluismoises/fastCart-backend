import { Router } from "express"
import {
  obtenerProductos,
  crearProducto,
  busquedaProductos,
  listaEmpresas,
  listaProductosEmpresa,
  obtenerProducto,
} from "../controllers/producto.controller"

const router = Router()

//Funciones
router.get("/", obtenerProductos)
router.post("/", crearProducto)
router.get("/search/:searchTerm", busquedaProductos)

router.get("/empresas", listaEmpresas)
router.get("/empresa/:empresa", listaProductosEmpresa)
router.get("/:productoId", obtenerProducto)

export default router
