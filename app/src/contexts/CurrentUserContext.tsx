import React from 'react'
import { UserFragment, useUserQuery } from '../types/graphql'
import { useDecodedAccessToken } from '../utils/authenticationUtils'

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
