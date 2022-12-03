import jwtDecode from 'jwt-decode'
import { AuthenticationToken } from '../types/graphql'
import { AuthenticationContext } from '../contexts/AuthenticationContext'
import React from 'react'

interface DecodedAccessToken {
  id: string
  email: string
  exp: number
}

export const useAccessToken = (): string | null => {
  const { accessToken } = React.useContext(AuthenticationContext)
  return accessToken
}

export const useIsAuthenticated = (): boolean => {
  const accessToken = useAccessToken()
  return Boolean(accessToken)
}

export const useRefreshToken = (): string | null => {
  const { refreshToken } = React.useContext(AuthenticationContext)
  return refreshToken
}

const decodeToken = (token: string): DecodedAccessToken | null => {
  try {
    return jwtDecode<{ id: string; email: string; exp: number }>(token)
  } catch {
    return null
  }
}

export const useDecodedAccessToken = (): DecodedAccessToken | null => {
  const accessToken = useAccessToken()

  if (!accessToken) {
    return null
  }

  const decodedAccessToken = decodeToken(accessToken)

  if (!decodedAccessToken) {
    return null
  }

  return decodedAccessToken
}

export const useSaveAuthenticationToken = (): ((authenticationToken: AuthenticationToken) => void) => {
  const { setAccessToken, setRefreshToken } = React.useContext(AuthenticationContext)

  return (authenticationToken: AuthenticationToken) => {
    setAccessToken(authenticationToken.accessToken)
    setRefreshToken(authenticationToken.refreshToken)
  }
}

export const useLogout = (): (() => void) => {
  const { setAccessToken, setRefreshToken } = React.useContext(AuthenticationContext)

  return () => {
    setAccessToken(null)
    setRefreshToken(null)
  }
}
