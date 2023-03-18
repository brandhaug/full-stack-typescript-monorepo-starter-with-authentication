import { useLogout } from '../utils/authenticationUtils'
import { RoutePaths } from '../types/custom'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useEffectOnce } from 'usehooks-ts'

export const LogOutView = (): JSX.Element => {
  const logout = useLogout()

  useEffectOnce(() => {
    logout()
  })

  return <Navigate to={RoutePaths.LOGIN} replace />
}
