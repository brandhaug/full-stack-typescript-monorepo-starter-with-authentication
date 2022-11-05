import { useLogout } from '../utils/authenticationUtils'
import { RoutePaths } from '../types/custom'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const LogOutView = (): JSX.Element => {
  const logout = useLogout()

  React.useEffect(() => {
    logout()
  }, [])

  return <Navigate to={RoutePaths.LOGIN} replace />
}
