import type React from 'react'

export enum RoutePaths {
  LOGIN = '/login',
  LOGOUT = '/logout',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  UPDATE_PASSWORD = '/update-password',
  CONTACT_US = '/contact-us',
  TERMS_AND_CONDITIONS = '/terms-and-conditions',
  PRIVACY_POLICY = '/privacy-policy',
  USER = '/user',
  MAIN = '/'
}

export type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>
