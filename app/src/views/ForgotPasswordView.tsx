import React from 'react'
import { NavLink } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useTranslation } from 'react-i18next'
import { useResetPasswordMutation } from '../types/graphqlOperations'
import { useForm } from 'react-hook-form'
import { type Form, type FormInput } from '../types/form'
import { Button, Card, ContainerCentered } from '@fstmswa/ui'
import { LogoCentered } from '../components/LogoCentered'

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
      <h4 className='mb-2 text-xl'>{t('Your password has been reset')}</h4>
      <p>{t('Follow the link sent to your email to create a new password')}</p>
    </div>
  ) : (
    <form onSubmit={formData.handleSubmit(handleReset)}>
      <FormInputs inputs={inputs} formData={formData} />
      <Button size='lg' className='mt-4 w-full' type='submit' loading={loading}>
        {t('Reset password')}
      </Button>
      <p className='mt-8 text-center'>
        {t('Do you remember your password?')}&nbsp;
        <NavLink className='text-blue-600' to={RoutePaths.LOGIN}>
          {t('Log in')}
        </NavLink>
      </p>
    </form>
  )

  return (
    <ContainerCentered>
      <Card>
        <LogoCentered />
        {content}
      </Card>
      <TermsAndPrivacy />
    </ContainerCentered>
  )
}
