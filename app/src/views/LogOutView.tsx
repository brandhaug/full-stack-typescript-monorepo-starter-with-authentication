import { useLogout } from '../utils/authenticationUtils'
import { RoutePaths } from '../types/custom'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const LogOutView = () => {
  const logout = useLogout()

  React.useEffect(() => {
    logout()
  }, [])

  return <Navigate to={RoutePaths.LOGIN} replace />
}
