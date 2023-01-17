import React from 'react'
import { RoutePaths } from '../types/custom'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useIsAuthenticated } from '../utils/authenticationUtils'

const useMenuItems = (): Array<{ title: string; to: RoutePaths }> => {
  const { t } = useTranslation()
  return [
    {
      title: t('Dashboard'),
      to: RoutePaths.MAIN
    },
    {
      title: t('Contact us'),
      to: RoutePaths.CONTACT_US
    },
    {
      title: t('Terms and Conditions'),
      to: RoutePaths.TERMS_AND_CONDITIONS
    },
    {
      title: t('Privacy Policy'),
      to: RoutePaths.PRIVACY_POLICY
    }
  ]
}

export const Footer = (): JSX.Element | null => {
  const { t } = useTranslation()

  const isAuthenticated = useIsAuthenticated()
  const menuItems = useMenuItems()

  const currentYear = new Date().getFullYear()

  if (!isAuthenticated) return null

  return (
    <footer className='flex justify-between bg-white py-4 px-8 shadow-xl'>
      <div className='w-1/3 self-center'>
        <p>
          © {currentYear} {t('Company Inc. All rights reserved.')}
        </p>
      </div>
      <div className='w-1/3 text-center'>
        <ul>
          {menuItems.map((menuItem) => {
            return (
              <li key={menuItem.to}>
                <NavLink to={menuItem.to}>{menuItem.title}</NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='w-1/3 self-center text-right'>
        <NavLink to={RoutePaths.CONTACT_US}>{t('Give feedback')}</NavLink>
      </div>
    </footer>
  )
}
