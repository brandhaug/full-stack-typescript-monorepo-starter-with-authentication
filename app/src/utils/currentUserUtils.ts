import { CurrentUserContext } from '../contexts/CurrentUserContext'
import React from 'react'
import { UserFragment } from '../types/graphqlTypes'

export const useCurrentUser = (): UserFragment | null => {
  const { currentUser } = React.useContext(CurrentUserContext)

  if (!currentUser) return null

  return currentUser
}
