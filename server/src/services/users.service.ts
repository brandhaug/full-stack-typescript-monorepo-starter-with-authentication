import * as UserDao from '../daos/users.dao'
import { type AuthenticationToken, type RefreshAccessTokenInput, type RegisterUserInput, type ResetPasswordInput, type UpdatePasswordInput, type User } from '@fstmswa/types'
import * as AuthenticationUtils from '../utils/authentication.utils'
import * as StringUtils from '../utils/string.utils'
import * as EmailService from '../services/email.service'
import { type User as DbUser } from '@prisma/client'
import { logger } from '../config/logger'

const generateResetPasswordHtml = (id: string, token: string): string => {
  if (!process.env.APP_URL) {
    throw new Error('Missing APP_URL env variable')
  }

  const href = `${process.env.APP_URL}/update-password?id=${id}&token=${token}`
  return `
    <p>Hei,</p>
    <p>Du er nå registert hos Company Inc.</p>
    <br />
    <p>Opprett passord ved å følge lenken nedenfor:</p>
    <p><a href='${href}'>${href}</a></p>
    <br />
    <p>Med vennlig hilsen</p>
    <p>Company Inc.</p>
  `
}

export const login = async ({ email, password }: { email: string; password: string }): Promise<AuthenticationToken> => {
  const user = await fetchOne({ email })

  if (!user) throw new Error('Fant ikke bruker')

  const validPassword = await AuthenticationUtils.validatePassword(password, user.hash)

  if (!validPassword) throw new Error('Feil passord')

  const authenticationToken = AuthenticationUtils.generateAuthenticationToken(user as User)
  return authenticationToken
}

export const fetchAll = async (): Promise<DbUser[]> => {
  const result = await UserDao.fetch()
  return result
}

export const fetchOne = async ({ id, email }: { id?: string; email?: string }): Promise<DbUser | null> => {
  const result = await UserDao.fetchOne({ id, email }).catch((err) => {
    logger.error(err)
    throw new Error('Kunne ikke hente bruker.')
  })

  return result
}

export const register = async (input: RegisterUserInput): Promise<AuthenticationToken> => {
  const existingUser = await fetchOne({ email: input.email })

  if (existingUser) {
    throw new Error('Bruker eksisterer allerede')
  }

  const { password, ...restUser } = input
  const hashedPassword = await AuthenticationUtils.hashString(input.password).catch((err) => {
    logger.error(err)
    throw new Error('Kunne ikke opprette passord.')
  })

  const userToCreate = { ...restUser, hash: hashedPassword }
  const createdUser = await UserDao.create(userToCreate).catch((err) => {
    logger.error(err)
    throw new Error('Kunne ikke opprette bruker.')
  })

  const authenticationToken = AuthenticationUtils.generateAuthenticationToken(createdUser as User)
  return authenticationToken
}

export const refreshAccessToken = async (input: RefreshAccessTokenInput): Promise<AuthenticationToken> => {
  const verifiedToken = await AuthenticationUtils.verifyAndDecodeRefreshToken(input.refreshToken).catch((err) => {
    logger.error(err)
    throw new Error('Kunne ikke oppdatere token.')
  })

  await fetchOne({ id: verifiedToken.id }).catch((err) => {
    logger.error(err)
    throw new Error('Finner ikke bruker')
  })

  const accessToken = AuthenticationUtils.generateAccessToken(verifiedToken)

  return { refreshToken: input.refreshToken, accessToken }
}

export const resetPassword = async (input: ResetPasswordInput): Promise<boolean> => {
  const existingUser = await fetchOne({ email: input.email }).catch((err) => {
    logger.error(err)
    throw new Error('Kunne ikke hente bruker.')
  })

  if (!existingUser) {
    throw new Error('Finner ikke bruker med denne emailen')
  }

  const randomResetPasswordString = StringUtils.randomString(7)
  const resetPasswordToken = await AuthenticationUtils.hashString(randomResetPasswordString)

  await update(existingUser.id, { resetPasswordToken }).catch((err) => {
    logger.error(err)
    throw new Error('Kunne ikke oppdatere bruker.')
  })

  const emailHtml = generateResetPasswordHtml(existingUser.id, resetPasswordToken)

  const email = await EmailService.sendMail({ to: existingUser.email, subject: 'Tilbakestill passord i Company Inc.', html: emailHtml }).catch((err) => {
    logger.error(err)
    throw new Error('Kunne ikke sende email.')
  })

  if (!email) throw new Error('Kunne ikke sende email.')

  return true
}

export const updatePassword = async (id: string, token: string, input: UpdatePasswordInput): Promise<AuthenticationToken> => {
  const user = await fetchOne({ id })

  if (!user) throw new Error('Kunne ikke finne bruker')

  if (token !== user.resetPasswordToken) throw new Error('Ugyldig link')

  const hashedPassword = await AuthenticationUtils.hashString(input.password)

  const updatedUser = await update(id, { hash: hashedPassword, resetPasswordToken: null })

  const accessToken = AuthenticationUtils.generateAuthenticationToken(updatedUser as User)

  return accessToken
}

export const update = async (id: string, data: Partial<Omit<DbUser, 'id'>>): Promise<DbUser> => {
  const result = await UserDao.update(id, data)
  return result
}

export const remove = async (id: string): Promise<DbUser> => {
  const result = await UserDao.remove(id)
  return result
}
