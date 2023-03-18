import * as AuthenticationUtils from './authentication.utils'
import { logger } from '../config/logger'
import { GraphQLError } from 'graphql/error'

export interface ApiContext {
  req: { headers: { authorization?: string } }
}

export const requireAuthenticated = async (accessTokenWithPrefix?: string, userId?: string): Promise<void> => {
  if (!accessTokenWithPrefix) {
    throw new GraphQLError('Not authenticated', { extensions: { code: 401 } })
  }

  const accessToken = accessTokenWithPrefix.replace('Bearer ', '')

  const decodedToken = await AuthenticationUtils.verifyAndDecodeAccessToken(accessToken).catch((err) => {
    logger.error(err)
    throw new GraphQLError('Not authenticated', { extensions: { code: 401 } })
  })

  if (userId && decodedToken.id !== userId) {
    throw new GraphQLError('Forbidden', { extensions: { code: 403 } })
  }
}
