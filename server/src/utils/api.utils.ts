import * as AuthenticationUtils from './authentication.utils'
import Logger from '../config/logger'
import { GraphQLError } from 'graphql/error'

export const requireAuthenticated = async (accessTokenWithPrefix: string, userId?: string): Promise<void> => {
  const accessToken = accessTokenWithPrefix.replace('Bearer ', '')

  const decodedToken = await AuthenticationUtils.verifyAndDecodeAccessToken(accessToken).catch((err) => {
    Logger.error(err)
    throw new GraphQLError('Not authenticated', { extensions: { code: 401 } })
  })

  if (userId && decodedToken.id !== userId) {
    throw new GraphQLError('Forbidden', { extensions: { code: 403 } })
  }
}
