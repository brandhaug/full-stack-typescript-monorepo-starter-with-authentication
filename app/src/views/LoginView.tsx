import React from 'react'
import { MutationFunction, useMutation } from '@apollo/client'
import LOGIN from '../graphql/users/mutations/login.graphql'
import { LoginMutation, LoginMutationVariables } from '../types/graphql'
import { toast } from 'react-hot-toast'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInput, FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useIsAuthenticated, useSaveAuthenticationToken } from '../utils/authenticationUtils'
import { useTranslation } from 'react-i18next'
import Logo from '../assets/logo_no-bg_cropped.png'

const useInputs = (): FormInput[] => {
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
    if (!data?.login) {
      toast.error(t('Something went wrong'))
      return
    }

    toast.success(t('Signed in'))
    saveAuthenticationToken(data.login)
    navigate(RoutePaths.MAIN)
  }

  const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN, { onCompleted: handleLoginCompleted })

  return { login, loading }
}

export const LoginView = (): JSX.Element => {
  const isAuthenticated = useIsAuthenticated()
  const { t } = useTranslation()
  const [formData, setFormData] = React.useState({ email: '', password: '' })
  const { login, loading } = useLogin()
  const inputs = useInputs()

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    await login({ variables: { input: formData } })
  }

  if (isAuthenticated) return <Navigate to={RoutePaths.MAIN} replace />

  return (
    <div className='container-centered'>
      <div className='w-full max-w-lg'>
        <div className='card'>
          <div className='flex justify-center'>
            <img className='mb-2 text-center' width={150} src={Logo} alt='App logo' />
          </div>
          <form onSubmit={handleSubmit}>
            <FormInputs inputs={inputs} formData={formData} setFormData={setFormData} />
            <div className='flex justify-end mb-2'>
              <NavLink to={RoutePaths.FORGOT_PASSWORD}>{t('Forgot your password?')}</NavLink>
            </div>
            <button className='w-full btn btn-primary' type='submit' disabled={loading}>
              {t('Log in')}
            </button>
            <p className='text-center mt-8'>
              {t("You don't have a user?")}&nbsp;
              <NavLink className='text-blue-600' to={RoutePaths.REGISTER}>
                {t('Register')}
              </NavLink>
            </p>
          </form>
        </div>
        <TermsAndPrivacy />
      </div>
    </div>
  )
}
