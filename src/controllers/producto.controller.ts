import { Router } from "express"
import asyncHandler from "express-async-handler"
import { ProductoModel } from "../models/producto.model"

//Funciones
////Obtener todos los productos
export const obtenerProductos = asyncHandler(async (req, res) => {
  const productos = await ProductoModel.find()
  res.send(productos)
})

////Crear un producto
export const crearProducto = async (req: any, res: any) => {
  const producto = new ProductoModel({
    id: "",
    nombre: req.body.nombre,
    precio: req.body.precio,
    empresas: req.body.empresas,
    favorito: req.body.favorito,
    imageUrl: req.body.imageUrl,
    categorias: req.body.categorias,
    descripcion: req.body.descripcion,
  })

  producto
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

////Buscar productos por nombre
export const busquedaProductos = asyncHandler(async (req, res) => {
  const searchRegex = new RegExp(req.params.searchTerm, "i")
  const productos = await ProductoModel.find({
    nombre: { $regex: searchRegex },
  })
  res.send(productos)
})

////Listar empresas
export const listaEmpresas = asyncHandler(async (req, res) => {
  const empresas = await ProductoModel.aggregate([
    {
      $unwind: "$empresas",
    },
    {
      $group: {
        _id: "$empresas",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        nombre: "$_id",
        count: "$count",
      },
    },
  ]).sort({ count: -1 })

  const all = {
    nombre: "All",
    count: await ProductoModel.countDocuments(),
  }

  empresas.unshift(all)
  res.send(empresas)
})

////Listar productos por empresa
export const listaProductosEmpresa = asyncHandler(async (req, res) => {
  const productos = await ProductoModel.find({ empresas: req.params.empresa })
  res.send(productos)
})

////Obtener un producto
export const obtenerProducto = asyncHandler(async (req, res) => {
  const producto = await ProductoModel.findById(req.params.productoId)
  res.send(producto)
})
