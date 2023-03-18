import React from 'react'
import { type MutationFunction } from '@apollo/client'
import { type LoginMutation, type LoginMutationVariables } from '../types/graphqlTypes'
import { toast } from 'react-hot-toast'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useIsAuthenticated, useSaveAuthenticationToken } from '../utils/authenticationUtils'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { type Form, type FormInput } from '../types/form'
import { useLoginMutation } from '../types/graphqlOperations'
import { Card, ContainerCentered, Button } from '@fstmswa/ui'
import { LogoCentered } from '../components/LogoCentered'

interface LoginForm extends Form {
  email: string
  password: string
}

const useInputs = (): Array<FormInput<LoginForm>> => {
  const { t } = useTranslation()
  return [
    {
      key: 'email',
      type: 'email',
      label: t('Email')
    },
    {
      key: 'password',
      type: 'password',
      label: t('Password')
    }
  ]
}

const useLogin = (): { login: MutationFunction<LoginMutation, LoginMutationVariables>; loading: boolean } => {
  const { t } = useTranslation()
  const saveAuthenticationToken = useSaveAuthenticationToken()
  const navigate = useNavigate()

  const handleLoginCompleted = (data: LoginMutation): void => {
    toast.success(t('Signed in'))
    saveAuthenticationToken(data.login.authenticationToken)
    navigate(RoutePaths.MAIN)
  }

  const [login, { loading }] = useLoginMutation({ onCompleted: handleLoginCompleted })

  return { login, loading }
}

export const LoginView = (): JSX.Element => {
  const isAuthenticated = useIsAuthenticated()
  const { t } = useTranslation()
  const formData = useForm<LoginForm>()
  const { login, loading } = useLogin()
  const inputs = useInputs()

  const handleLogin = async (input: LoginForm): Promise<void> => {
    await login({ variables: { input } })
  }

  if (isAuthenticated) return <Navigate to={RoutePaths.MAIN} replace />

  return (
    <ContainerCentered>
      <Card>
        <LogoCentered />
        <form onSubmit={formData.handleSubmit(handleLogin)}>
          <FormInputs inputs={inputs} formData={formData} />
          <div className='mb-2 flex justify-end'>
            <NavLink to={RoutePaths.FORGOT_PASSWORD}>{t('Forgot your password?')}</NavLink>
          </div>
          <Button size='lg' className='w-full' type='submit' loading={loading}>
            {t('Log in')}
          </Button>
          <p className='mt-8 text-center'>
            {t("You don't have a user?")}&nbsp;
            <NavLink className='text-blue-600' to={RoutePaths.REGISTER}>
              {t('Register')}
            </NavLink>
          </p>
        </form>
      </Card>
      <TermsAndPrivacy />
    </ContainerCentered>
  )
}
