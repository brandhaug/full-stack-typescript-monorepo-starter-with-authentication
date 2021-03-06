import React from 'react'
import { useMutation } from '@apollo/client'
import { ResetPasswordMutation, ResetPasswordMutationVariables } from '../types/graphql'
import RESET_PASSWORD from '../graphql/users/mutations/resetPassword.graphql'
import { toast } from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useTranslation } from 'react-i18next'

const useInputs = () => {
  const { t } = useTranslation()
  return [
    {
      key: 'email',
      type: 'email',
      label: t('Email')
    }
  ]
}

export const ForgotPasswordView = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = React.useState({ email: '' })
  const [submitted, setSubmitted] = React.useState(false)

  const handleForgotPasswordCompleted = (data: ResetPasswordMutation) => {
    if (!data?.resetPassword) {
      toast.error(t('Something went wrong'))
      return
    }

    setSubmitted(true)
  }

  const [resetPassword, { loading }] = useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(RESET_PASSWORD, { onCompleted: handleForgotPasswordCompleted })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    resetPassword({ variables: { input: formData } })
  }

  const inputs = useInputs()

  const content = submitted ? (
    <div className='text-center'>
      <h4 className='text-xl mb-2'>{t('Your password has been reset')}</h4>
      <p>{t('Follow the link sent to your email to create a new password')}</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <FormInputs inputs={inputs} formData={formData} setFormData={setFormData} />
      <button className='w-full btn btn-primary mt-4' type='submit' disabled={loading}>
        {t('Reset password')}
      </button>
      <p className='text-center mt-8'>
        {t('Do you remember your password?')}&nbsp;
        <NavLink className='text-blue-600' to={RoutePaths.LOGIN}>
          {t('Log in')}
        </NavLink>
      </p>
    </form>
  )

  return (
    <div className='container-centered'>
      <div className='w-full max-w-lg'>
        <div className='card'>
          <div className='flex justify-center'>
            <img className='mb-2 text-center' width={150} src='../assets/logo_no-bg_cropped.png' alt='App logo' />
          </div>
          {content}
        </div>
        <TermsAndPrivacy />
      </div>
    </div>
  )
}
