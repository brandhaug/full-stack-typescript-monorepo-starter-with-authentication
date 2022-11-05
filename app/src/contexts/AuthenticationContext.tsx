import React from 'react'
import { usePersistentState } from '../utils/stateHooks'

interface AuthenticationContextProps {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  refreshToken: string | null
  setRefreshToken: (token: string | null) => void
}

export const AuthenticationContext = React.createContext<AuthenticationContextProps>({
  accessToken: null,
  setAccessToken: (token: string | null) => token,
  refreshToken: null,
  setRefreshToken: (token: string | null) => token
})

export const AuthenticationContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
  const [accessToken, setAccessToken] = usePersistentState<string | null>('accessToken', null)
  const [refreshToken, setRefreshToken] = usePersistentState<string | null>('refreshToken', null)

  return <AuthenticationContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}>{children}</AuthenticationContext.Provider>
}
