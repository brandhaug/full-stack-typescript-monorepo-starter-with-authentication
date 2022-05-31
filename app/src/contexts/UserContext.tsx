import React from 'react'
import { UserFragment, UserQuery, UserQueryVariables } from '../types/graphql'
import { useQuery } from '@apollo/client'
import USER from '../graphql/users/queries/user.graphql'
import { useDecodedAccessToken } from '../utils/authenticationUtils'

interface UserContextProps {
  user: UserFragment | null
}

export const UserContext = React.createContext<UserContextProps>({ user: null })

export const UserContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const decodedAccessToken = useDecodedAccessToken()
  const { data } = useQuery<UserQuery, UserQueryVariables>(USER, { variables: { id: decodedAccessToken?.id as string }, skip: !decodedAccessToken })
  const user = data?.user ?? null

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}
