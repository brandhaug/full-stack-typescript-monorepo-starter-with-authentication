import * as AuthenticationUtils from './authentication.utils'
import Logger from '../config/logger'
import { GraphQLYogaError } from '@graphql-yoga/node'

export const requireAuthenticated = async (accessTokenWithPrefix: string, userId?: string) => {
  const accessToken = accessTokenWithPrefix.replace('Bearer ', '')

  const decodedToken = await AuthenticationUtils.verifyAndDecodeAccessToken(accessToken)
    .catch(err => {
      Logger.error(err)
      throw new GraphQLYogaError('Not authenticated', { code: 401 })
    })

  if (userId && decodedToken.id !== userId) {
    throw new GraphQLYogaError('Forbidden', { code: 403 })
  }
}