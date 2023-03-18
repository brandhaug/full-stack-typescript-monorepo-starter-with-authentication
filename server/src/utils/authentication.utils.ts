import jwt, { type Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { type AuthenticationToken, type User, type UserRole } from '@fstmswa/types'

export interface TokenPayload {
  id: string
  role: UserRole
  exp: number
}

export const generateAuthenticationToken = (user: User): AuthenticationToken => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  return { accessToken, refreshToken }
}

export const generateAccessToken = (payload: Omit<TokenPayload, 'exp'>): string => generateToken(payload, '1h', process.env.ACCESS_TOKEN_SECRET as Secret)
export const generateRefreshToken = (payload: Omit<TokenPayload, 'exp'>): string => generateToken(payload, '1w', process.env.REFRESH_TOKEN_SECRET as Secret)

export const verifyAndDecodeAccessToken = async (token: string): Promise<TokenPayload> => await verifyAndDecodeToken(token, process.env.ACCESS_TOKEN_SECRET as Secret)
export const verifyAndDecodeRefreshToken = async (token: string): Promise<TokenPayload> => await verifyAndDecodeToken(token, process.env.REFRESH_TOKEN_SECRET as Secret)

const generateToken = (payload: Omit<TokenPayload, 'exp'>, lifeTime: string, secret: Secret): string => {
  return jwt.sign(
    {
      id: payload.id,
      role: payload.role
    },
    secret,
    { expiresIn: lifeTime }
  )
}

export const hashString = async (str: string): Promise<string> => {
  const saltRounds = 10

  const hashedString: string = await new Promise((resolve, reject) => {
    bcrypt.hash(str, saltRounds, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })

  return hashedString
}

export const validatePassword = async (password: string, hash: string): Promise<boolean> => {
  const isValid: boolean = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash.toString(), (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })

  return isValid
}

const verifyAndDecodeToken = async (token: string, secret: Secret): Promise<TokenPayload> => {
  const verifiedToken: TokenPayload = await new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, result) => {
      if (err) reject(err)
      resolve(result as TokenPayload)
    })
  })

  return verifiedToken
}
