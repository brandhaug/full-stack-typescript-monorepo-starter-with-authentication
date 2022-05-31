import { User } from '@prisma/client'
import { prismaClient } from '../config/database'
import { RegisterUserInput } from '../types/graphql'

export const fetch = async () => {
  const result = await prismaClient.user.findMany()
  return result
}

export const fetchOne = async ({ id, email }: { id?: string; email?: string }) => {
  const result = await prismaClient.user.findUnique({
    where: {
      id,
      email: email?.toLowerCase()
    }
  })
  return result
}

export const create = async (data: Omit<RegisterUserInput, 'password'> & { hash: string }) => {
  const result = await prismaClient.user.create({
    data: {
      ...data,
      email: data.email.toLowerCase()
    }
  })

  return result
}

export const update = async (id: string, data: Partial<Omit<User, 'id'>>) => {
  const result = await prismaClient.user.update({
    where: {
      id
    },
    data
  })
  return result
}

export const remove = async (id: string) => {
  const result = prismaClient.user.delete({
    where: {
      id
    }
  })
  return result
}
