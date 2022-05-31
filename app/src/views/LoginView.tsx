import React from 'react'
import { useMutation } from '@apollo/client'
import LOGIN from '../graphql/users/mutations/login.graphql'
import { LoginMutation, LoginMutationVariables } from '../types/graphql'
import { toast } from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useIsAuthenticated, useSaveAuthenticationToken } from '../utils/authenticationUtils'
import { useTranslation } from 'react-i18next'

const useInputs = () => {
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

const useLogin = () => {
  const { t } = useTranslation()
  const saveAuthenticationToken = useSaveAuthenticationToken()
  const navigate = useNavigate()

  const handleLoginCompleted = (data: LoginMutation) => {
    if (!data?.login) {
      toast.error(t('Something went wrong'))
      return
    }

    saveAuthenticationToken(data.login)
    navigate(RoutePaths.MAIN)
  }

  const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN, { onCompleted: handleLoginCompleted })

  return { login, loading }
}

export const LoginView = () => {
  const isAuthenticated = useIsAuthenticated()
  const { t } = useTranslation()
  const [formData, setFormData] = React.useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { login, loading } = useLogin()
  const inputs = useInputs()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    login({ variables: { input: formData } })
  }

  React.useEffect(() => {
    if (!isAuthenticated) return
    navigate(RoutePaths.MAIN)
  }, [])


  return (
    <div className='container-centered'>
      <div className='w-full max-w-lg'>
        <div className='card'>
          <div className='flex justify-center'>
            <img className='mb-2 text-center' width={150} src='../assets/logo_no-bg_cropped.png' alt='App logo' />
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
              {t('You don\'t have a user?')}&nbsp;
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
