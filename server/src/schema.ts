import { makeExecutableSchema } from '@graphql-tools/schema'
import * as UsersService from './services/users.service'
import { readFileSync } from 'fs'
import { Resolvers } from './types/graphqlTypes'
import { User as DbUser } from '@prisma/client'
import * as ApiUtils from './utils/api.utils'
import path from 'path'
import { User } from '@fstmswa/types'
import { GraphQLError } from 'graphql/error'

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello World!',
    user: async (_, { id }, context) => {
      const accessToken = context.req.headers.authorization
      await ApiUtils.requireAuthenticated(accessToken, id)

      return await (UsersService.fetchOne({ id }).catch((err) => {
        throw new GraphQLError(err)
      }) as Promise<User>)
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      return await UsersService.register(input).catch((err) => {
        throw new GraphQLError(err)
      })
    },
    login: async (_, { input }) => {
      return await UsersService.login(input).catch((err) => {
        throw new GraphQLError(err)
      })
    },
    refreshAccessToken: async (_, { input }) => {
      return await UsersService.refreshAccessToken(input).catch((err) => {
        throw new GraphQLError(err)
      })
    },
    resetPassword: async (_, { input }) => {
      return await UsersService.resetPassword(input).catch((err) => {
        throw new GraphQLError(err)
      })
    },
    updatePassword: async (_, { id, token, input }) => {
      return await UsersService.updatePassword(id, token, input).catch((err) => {
        throw new GraphQLError(err)
      })
    },
    updateUser: async (_, { id, input }, context) => {
      const accessToken = context.req.headers.authorization
      await ApiUtils.requireAuthenticated(accessToken, id)

      return await (UsersService.update(id, input as Partial<Omit<DbUser, 'id'>>).catch((err) => {
        throw new GraphQLError(err)
      }) as Promise<User>)
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
