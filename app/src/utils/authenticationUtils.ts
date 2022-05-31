import jwtDecode from 'jwt-decode'
import { AuthenticationToken } from '../types/graphql'
import { AuthenticationContext } from '../contexts/AuthenticationContext'
import React from 'react'

export const useAccessToken = () => {
  const { accessToken } = React.useContext(AuthenticationContext)
  return accessToken
}

export const useIsAuthenticated = () => {
  const accessToken = useAccessToken()
  return Boolean(accessToken)
}

export const useRefreshToken = () => {
  const { refreshToken } = React.useContext(AuthenticationContext)
  return refreshToken
}

const decodeToken = (token: string) => {
  try {
    return jwtDecode<{ id: string; email: string; exp: number }>(token)
  } catch {
    return null
  }
}

export const useDecodedAccessToken = () => {
  const logout = useLogout()

  const accessToken = useAccessToken()
  if (!accessToken) {
    logout()
    return null
  }

  const decodedAccessToken = decodeToken(accessToken)
  if (!decodedAccessToken) {
    logout()
    return null
  }

  return decodedAccessToken
}

export const useSaveAuthenticationToken = () => {
  const { setAccessToken, setRefreshToken } = React.useContext(AuthenticationContext)

  return (authenticationToken: AuthenticationToken) => {
    setAccessToken(authenticationToken.accessToken)
    setRefreshToken(authenticationToken.refreshToken)
  }
}

export const useLogout = () => {
  const { setAccessToken, setRefreshToken } = React.useContext(AuthenticationContext)

  return () => {
    setAccessToken(null)
    setRefreshToken(null)
  }
}
