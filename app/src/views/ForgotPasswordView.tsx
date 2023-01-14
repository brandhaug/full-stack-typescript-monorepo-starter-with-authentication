import React from 'react'
import { NavLink } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInput, FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useTranslation } from 'react-i18next'
import Logo from '../assets/logo_no-bg_cropped.png'
import { useResetPasswordMutation } from '../types/graphqlOperations'
import { useForm } from 'react-hook-form'
import { Form } from '../types/form'

interface ForgotPasswordForm extends Form {
  email: string
}

const useInputs = (): Array<FormInput<ForgotPasswordForm>> => {
  const { t } = useTranslation()
  return [
    {
      key: 'email',
      type: 'email',
      label: t('Email')
    }
  ]
}

export const ForgotPasswordView = (): JSX.Element => {
  const { t } = useTranslation()
  const formData = useForm<ForgotPasswordForm>()
  const [submitted, setSubmitted] = React.useState(false)

  const handleForgotPasswordCompleted = (): void => {
    setSubmitted(true)
  }

  const [resetPassword, { loading }] = useResetPasswordMutation({ onCompleted: handleForgotPasswordCompleted })

  const handleReset = async (input: ForgotPasswordForm): Promise<void> => {
    await resetPassword({ variables: { input } })
  }

  const inputs = useInputs()

  const content = submitted ? (
    <div className='text-center'>
      <h4 className='text-xl mb-2'>{t('Your password has been reset')}</h4>
      <p>{t('Follow the link sent to your email to create a new password')}</p>
    </div>
  ) : (
    <form onSubmit={formData.handleSubmit(handleReset)}>
      <FormInputs inputs={inputs} formData={formData} />
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
            <img className='mb-2 text-center' width={150} src={Logo} alt='App logo' />
          </div>
          {content}
        </div>
        <TermsAndPrivacy />
      </div>
    </div>
  )
}
