import { NavLink } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const TermsAndPrivacy = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <div className='flex justify-center mt-4 text-gray-500'>
      <NavLink className='mx-4' to={RoutePaths.TERMS_AND_CONDITIONS} target='_blank'>
        {t('Terms and Conditions')}
      </NavLink>
      <NavLink className='mx-4' to={RoutePaths.PRIVACY_POLICY} target='_blank'>
        {t('Privacy Policy')}
      </NavLink>
    </div>
  )
}
