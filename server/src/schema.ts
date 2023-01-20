import { makeExecutableSchema } from '@graphql-tools/schema'
import * as UsersService from './services/users.service'
import { readFileSync } from 'fs'
import { Resolvers } from './types/graphqlTypes'
import { User as DbUser } from '@prisma/client'
import * as ApiUtils from './utils/api.utils'
import path from 'path'
import { Query, User } from '@fstmswa/types'
import { GraphQLError } from 'graphql/error'

interface Context {
  req: { headers: { authorization?: string } }
}

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello World!',
    user: async (_, { id }, context: Context) => {
      const accessToken = context.req.headers.authorization
      await ApiUtils.requireAuthenticated(accessToken, id)

      return await (UsersService.fetchOne({ id }).catch((err) => {
        throw new GraphQLError(err)
      }) as Promise<User>)
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      const authenticationToken = await UsersService.register(input).catch((err) => {
        throw new GraphQLError(err)
      })

      return {
        authenticationToken,
        query: {} as Query
      }
    },
    login: async (_, { input }) => {
      const authenticationToken = await UsersService.login(input).catch((err) => {
        throw new GraphQLError(err)
      })

      return {
        authenticationToken,
        query: {} as Query
      }
    },
    refreshAccessToken: async (_, { input }) => {
      const authenticationToken = await UsersService.refreshAccessToken(input).catch((err) => {
        throw new GraphQLError(err)
      })

      return {
        authenticationToken,
        query: {} as Query
      }
    },
    resetPassword: async (_, { input }) => {
      const success = await UsersService.resetPassword(input).catch((err) => {
        throw new GraphQLError(err)
      })

      return {
        success,
        query: {} as Query
      }
    },
    updatePassword: async (_, { id, token, input }) => {
      const authenticationToken = await UsersService.updatePassword(id, token, input).catch((err) => {
        throw new GraphQLError(err)
      })

      return {
        authenticationToken,
        query: {} as Query
      }
    },
    updateUser: async (_, { id, input }, context: Context) => {
      const accessToken = context.req.headers.authorization
      await ApiUtils.requireAuthenticated(accessToken, id)

      const user = await UsersService.update(id, input as Partial<Omit<DbUser, 'id'>>).catch((err) => {
        throw new GraphQLError(err)
      })

      return {
        user: user as User,
        query: {} as Query
      }
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
