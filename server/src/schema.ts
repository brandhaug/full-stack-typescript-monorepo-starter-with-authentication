import { makeExecutableSchema } from '@graphql-tools/schema'
import * as UsersService from './services/users.service'
import { readFileSync } from 'fs'
import { Resolvers, User } from './types/graphql'
import { GraphQLYogaError } from '@graphql-yoga/node'
import { User as DbUser } from '@prisma/client'
import * as ApiUtils from './utils/api.utils'
import path from 'path'

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello World!',
    user: async (_, { id }, context) => {
      const accessToken = context.req.headers.authorization
      await ApiUtils.requireAuthenticated(accessToken, id)

      return await (UsersService.fetchOne({ id }).catch((err) => {
        throw new GraphQLYogaError(err)
      }) as Promise<User>)
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      return await UsersService.register(input).catch((err) => {
        throw new GraphQLYogaError(err)
      })
    },
    login: async (_, { input }) => {
      return await UsersService.login(input).catch((err) => {
        throw new GraphQLYogaError(err)
      })
    },
    refreshAccessToken: async (_, { input }) => {
      return await UsersService.refreshAccessToken(input).catch((err) => {
        throw new GraphQLYogaError(err)
      })
    },
    resetPassword: async (_, { input }) => {
      return await UsersService.resetPassword(input).catch((err) => {
        throw new GraphQLYogaError(err)
      })
    },
    updatePassword: async (_, { id, token, input }) => {
      return await UsersService.updatePassword(id, token, input).catch((err) => {
        throw new GraphQLYogaError(err)
      })
    },
    updateUser: async (_, { id, input }, context) => {
      const accessToken = context.req.headers.authorization
      await ApiUtils.requireAuthenticated(accessToken, id)

      return await (UsersService.update(id, input as Partial<Omit<DbUser, 'id'>>).catch((err) => {
        throw new GraphQLYogaError(err)
      }) as Promise<User>)
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
