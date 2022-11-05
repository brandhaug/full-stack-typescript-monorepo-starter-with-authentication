import React from 'react'
import { useTranslation } from 'react-i18next'

export const ContactUsView = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div className='flex justify-center py-20 px-12'>
      <div className='max-w-4xl'>
        <h1 className='text-xl'>{t('Contact us')}</h1>
        <p className='text-md text-blue-500'><a href='mailto:martin@brandhaug.net'>martin@brandhaug.net</a></p>
      </div>
    </div>
  )
}
