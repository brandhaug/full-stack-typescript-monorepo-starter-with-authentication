import React from 'react'
import { type UserFragment } from '../types/graphqlTypes'
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

  const value = React.useMemo(
    () => ({
      currentUser
    }),
    [currentUser]
  )

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}
