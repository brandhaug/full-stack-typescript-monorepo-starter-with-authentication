import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInput, FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useSaveAuthenticationToken } from '../utils/authenticationUtils'
import { RegisterUserMutation } from '../types/graphqlTypes'
import { toast } from 'react-hot-toast'
import { languageIsoToLanguage } from '../utils/languageUtils'
import Logo from '../assets/logo_no-bg_cropped.png'
import { useRegisterUserMutation } from '../types/graphqlOperations'
import { Language } from '@fstmswa/types'
import { useForm } from 'react-hook-form'
import { Form } from '../types/form'

interface RegisterForm extends Form {
  firstName: string
  lastName: string
  email: string
  password: string
  termsAndPolicyAccepted: boolean
  language: Language
}

const useInputs = (): Array<FormInput<RegisterForm>> => {
  const { t } = useTranslation()
  return [
    {
      key: 'firstName',
      type: 'text',
      label: t('First name')
    },
    {
      key: 'lastName',
      type: 'text',
      label: t('Last name')
    },
    {
      key: 'email',
      type: 'email',
      label: t('Email')
    },
    {
      key: 'password',
      type: 'password',
      label: t('Password'),
      minLength: 6
    },
    {
      key: 'termsAndPolicyAccepted',
      type: 'checkbox',
      label: (
        <>
          {t('I accept')}&nbsp;
          <NavLink className='text-blue-600' to={RoutePaths.TERMS_AND_CONDITIONS} target='_blank'>
            {t('Terms and Conditions')}
          </NavLink>
          &nbsp;{t('and')}&nbsp;
          <NavLink className='text-blue-600' to={RoutePaths.PRIVACY_POLICY} target='_blank'>
            {t('Privacy Policy')}
          </NavLink>
        </>
      )
    }
  ]
}

export const RegisterView = (): JSX.Element | null => {
  const { t } = useTranslation()
  const defaultLanguage = languageIsoToLanguage[navigator.language] ?? Language.English
  const formData = useForm<RegisterForm>({ defaultValues: { language: defaultLanguage } })
  const saveAuthenticationToken = useSaveAuthenticationToken()
  const navigate = useNavigate()

  const handleRegisterCompleted = (data: RegisterUserMutation): void => {
    if (!data?.registerUser) {
      toast.error(t('Something went wrong'))
      return
    }

    toast.success(t('Registered'))
    saveAuthenticationToken(data.registerUser)
    navigate(RoutePaths.MAIN)
  }

  const [registerUser, { loading }] = useRegisterUserMutation({ onCompleted: handleRegisterCompleted })

  const handleRegister = async (input: RegisterForm): Promise<void> => {
    await registerUser({ variables: { input } })
  }

  const inputs = useInputs()

  return (
    <div className='container-centered'>
      <div className='w-full max-w-lg'>
        <div className='card'>
          <div className='flex justify-center'>
            <img className='mb-2 text-center' width={150} src={Logo} alt='App logo' />
          </div>
          <form onSubmit={formData.handleSubmit(handleRegister)}>
            <FormInputs inputs={inputs} formData={formData} />
            <button className='w-full btn btn-primary mt-4' type='submit' disabled={loading}>
              {t('Register')}
            </button>
            <p className='text-center mt-8'>
              {t('Do you already have a user?')}&nbsp;
              <NavLink className='text-blue-600' to={RoutePaths.LOGIN}>
                {t('Log in')}
              </NavLink>
            </p>
          </form>
        </div>
        <TermsAndPrivacy />
      </div>
    </div>
  )
}
