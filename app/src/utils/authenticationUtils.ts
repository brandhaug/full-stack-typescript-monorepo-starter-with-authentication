import jwtDecode from 'jwt-decode'
import { AuthenticationToken, RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables } from '../types/graphql'
import { AuthenticationContext } from '../contexts/AuthenticationContext'
import React from 'react'
import { ApolloClient } from '@apollo/client'
import REFRESH_ACCESS_TOKEN from '../graphql/users/mutations/refreshAccessToken.graphql'

export const useAccessToken = () => {
  const { accessToken } = React.useContext(AuthenticationContext)
  return accessToken
}

export const useIsAuthenticated = () => {
  const accessToken = useAccessToken()

  return accessToken
  // return isTokenValid(accessToken)
}

export const useFetchAccessToken = (apolloClient: ApolloClient<any>) => {
  const { accessToken } = React.useContext(AuthenticationContext)
  const logout = useLogout()
  const refreshToken = useRefreshToken()
  const saveAuthenticationToken = useSaveAuthenticationToken()

  const isValid = isTokenValid(accessToken)

  return async () => {
    if (isValid) {
      return accessToken
    }

    if (!refreshToken) {
      logout()
      return
    }

    const { data } = await apolloClient.mutate<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>({ mutation: REFRESH_ACCESS_TOKEN, variables: { input: { refreshToken } } })

    if (!data?.refreshAccessToken) return null

    saveAuthenticationToken(data.refreshAccessToken)

    return accessToken
  }
}

export const useRefreshToken = () => {
  const { refreshToken } = React.useContext(AuthenticationContext)
  return refreshToken
}

const decodeToken = (token: string) => {
  return jwtDecode<{ id: string; email: string; exp: number }>(token)
}

export const useDecodedAccessToken = () => {
  const accessToken = useAccessToken()
  if (!accessToken) return null

  const decodedAccessToken = decodeToken(accessToken)
  if (!decodedAccessToken) return null

  return decodedAccessToken
}

export const isTokenValid = (token: string | null) => {
  if (!token) return false

  const decodedToken = decodeToken(token)

  const now = new Date()
  const expiresAt = new Date(decodedToken.exp)

  return expiresAt > now
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
