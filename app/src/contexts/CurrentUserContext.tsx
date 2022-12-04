import React from 'react'
import { UserFragment, UserQuery, UserQueryVariables } from '../types/graphql'
import { useQuery } from '@apollo/client'
import USER from '../graphql/users/queries/user.graphql'
import { useDecodedAccessToken } from '../utils/authenticationUtils'

interface CurrentUserContextProps {
  currentUser: UserFragment | null
}

export const CurrentUserContext = React.createContext<CurrentUserContextProps>({ currentUser: null })

export const CurrentUserContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
  const decodedAccessToken = useDecodedAccessToken()
  const { data } = useQuery<UserQuery, UserQueryVariables>(USER, { variables: { id: decodedAccessToken?.id ?? '' }, skip: !decodedAccessToken })
  const currentUser = data?.user ?? null

  return <CurrentUserContext.Provider value={{ currentUser }}>{children}</CurrentUserContext.Provider>
}
