import { UserContext } from '../contexts/UserContext'
import React from 'react'

export const useCurrentUser = () => {
  const { user } = React.useContext(UserContext)

  if (!user) return null

  return user
}