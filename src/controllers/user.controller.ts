import { Router } from "express"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { User, UserModel } from "../models/user.model"
import { HTTP_BAD_REQUEST } from "../helpers/http-status"
import { generateTokenReponse } from "../middlewares/token-generador"
import bcrypt from "bcryptjs"

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenReponse(user))
  } else {
    res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!")
  }
})

export const registro = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body
  const user = await UserModel.findOne({ email })
  if (user) {
    res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!")
    return
  }

  const encryptedPassword = await bcrypt.hash(password, 10)

  const newUser: User = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false,
  }

  const dbUser = await UserModel.create(newUser)
  res.send(generateTokenReponse(dbUser))
})
