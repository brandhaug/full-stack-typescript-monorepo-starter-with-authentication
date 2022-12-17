import React from 'react'
import { UserFragment } from '../types/graphqlTypes'
import { useDecodedAccessToken } from '../utils/authenticationUtils'
import { useUserQuery } from '../types/graphqlOperations'

interface CurrentUserContextProps {
  currentUser: UserFragment | null
}

export const CurrentUserContext = React.createContext<CurrentUserContextProps>({ currentUser: null })

export const CurrentUserContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
  const decodedAccessToken = useDecodedAccessToken()
  const { data } = useUserQuery({ variables: { id: decodedAccessToken?.id ?? '' }, skip: !decodedAccessToken })
  const currentUser = data?.user ?? null

  return <CurrentUserContext.Provider value={{ currentUser }}>{children}</CurrentUserContext.Provider>
}
