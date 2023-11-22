import jwt from 'jsonwebtoken'
import { IUser } from '../models/User'

export const tokenSign = (user?: any) => {
  const token = jwt.sign(
    {
      username: user?.username,
      password: user?.password,
      permission: user?.permission
    },
    process.env.JWT_PRIVATE_KEY as string,
    // { expiresIn: process.env.TOKEN_EXPIRY_TIME }
  )
  return token
}

export const tokenDecode = (token: string) => {
  try {
    if (token) {
      const user = jwt.verify(
        token,
        process.env.JWT_PRIVATE_KEY as string,
        // { ignoreExpiration: true }
      )
      return user
    }
    return null;
  } catch (error) {
    return null;
  }
}