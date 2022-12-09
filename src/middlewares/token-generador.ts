import { User } from "../models/user.model"
import jwt from "jsonwebtoken"

export const generateTokenReponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "Esto-Es-UnA-PalbR@_SecretA12341267"!,
    {
      expiresIn: "30d",
    }
  )

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  }
}
