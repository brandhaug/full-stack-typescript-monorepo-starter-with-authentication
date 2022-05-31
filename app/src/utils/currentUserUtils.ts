import { UserContext } from '../contexts/UserContext'
import React from 'react'

export const useCurrentUser = () => {
  const { currentUser } = React.useContext(UserContext)

  if (!currentUser) return null

  return currentUser
}