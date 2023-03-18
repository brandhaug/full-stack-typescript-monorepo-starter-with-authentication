import { makeExecutableSchema } from '@graphql-tools/schema'
import * as UsersService from './services/users.service'
import { readFileSync } from 'fs'
import { type Resolvers } from './types/graphqlTypes'
import { type User as DbUser } from '@prisma/client'
import path from 'path'
import { type Query, type User } from '@fstmswa/types'
import { GraphQLError } from 'graphql/error'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './permissions'

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello World!',
    user: async (_, { id }) => {
      return await (UsersService.fetchOne({ id }).catch((err: Error) => {
        throw new GraphQLError(err.message)
      }) as Promise<User>)
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      const authenticationToken = await UsersService.register(input).catch((err: Error) => {
        throw new GraphQLError(err.message)
      })

      return {
        authenticationToken,
        query: {} as Query
      }
    },
    login: async (_, { input }) => {
      const authenticationToken = await UsersService.login(input).catch((err: Error) => {
        throw new GraphQLError(err.message)
      })

      return {
        authenticationToken,
        query: {} as Query
      }
    },
    refreshAccessToken: async (_, { input }) => {
      const authenticationToken = await UsersService.refreshAccessToken(input).catch((err: Error) => {
        throw new GraphQLError(err.message)
      })

      return {
        authenticationToken,
        query: {} as Query
      }
    },
    resetPassword: async (_, { input }) => {
      const success = await UsersService.resetPassword(input).catch((err: Error) => {
        throw new GraphQLError(err.message)
      })

      return {
        success,
        query: {} as Query
      }
    },
    updatePassword: async (_, { id, token, input }) => {
      const authenticationToken = await UsersService.updatePassword(id, token, input).catch((err: Error) => {
        throw new GraphQLError(err.message)
      })

      return {
        authenticationToken,
        query: {} as Query
      }
    },
    updateUser: async (_, { id, input }) => {
      const user = await UsersService.update(id, input as Partial<Omit<DbUser, 'id'>>).catch((err: Error) => {
        throw new GraphQLError(err.message)
      })

      return {
        user: user as User,
        query: {} as Query
      }
    }
  }
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export const schema = applyMiddleware(executableSchema, permissions)
