import { allow, and, rule, shield } from 'graphql-shield'
import { type ApiContext } from './utils/api.utils'
import * as AuthenticationUtils from './utils/authentication.utils'
import { logger } from './config/logger'

const rules = {
  isAuthenticated: rule({ cache: 'contextual' })(async (_, __, ctx: ApiContext) => {
    const accessTokenWithPrefix = ctx.req.headers.authorization

    if (!accessTokenWithPrefix) {
      return false
      // throw new GraphQLError('Not authenticated', { extensions: { code: 401 } })
    }

    const accessToken = accessTokenWithPrefix.replace('Bearer ', '')
    await AuthenticationUtils.verifyAndDecodeAccessToken(accessToken).catch((err) => {
      logger.error(err)
      return false
      // throw new GraphQLError('Not authenticated', { extensions: { code: 401 } })
    })
    return true
  }),
  isSameUser: rule({ cache: 'contextual' })(async (_, args: Record<string, unknown>, ctx: ApiContext) => {
    const accessTokenWithPrefix = ctx.req.headers.authorization

    if (!accessTokenWithPrefix) {
      return false
      // throw new GraphQLError('Not authenticated', { extensions: { code: 401 } })
    }

    const accessToken = accessTokenWithPrefix.replace('Bearer ', '')

    const decodedToken = await AuthenticationUtils.verifyAndDecodeAccessToken(accessToken).catch((err) => {
      logger.error(err)
      return false
      // throw new GraphQLError('Not authenticated', { extensions: { code: 401 } })
    })

    if (args.id && typeof decodedToken === 'object' && decodedToken.id !== args.id) {
      return false
      // throw new GraphQLError('Forbidden', { extensions: { code: 403 } })
    }

    return true
  })
}

export const permissions = shield({
  Query: {
    hello: allow,
    user: and(rules.isAuthenticated, rules.isSameUser)
  },
  Mutation: {
    registerUser: allow,
    login: allow,
    refreshAccessToken: and(rules.isAuthenticated, rules.isSameUser),
    resetPassword: allow,
    updatePassword: allow,
    updateUser: and(rules.isAuthenticated, rules.isSameUser)
  },
  User: and(rules.isAuthenticated, rules.isSameUser)
})
