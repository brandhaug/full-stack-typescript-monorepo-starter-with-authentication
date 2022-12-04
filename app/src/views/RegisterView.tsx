import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInput, FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useSaveAuthenticationToken } from '../utils/authenticationUtils'
import { Language, RegisterUserMutation, useRegisterUserMutation } from '../types/graphql'
import { toast } from 'react-hot-toast'
import { languageIsoToLanguage } from '../utils/languageUtils'
import Logo from '../assets/logo_no-bg_cropped.png'

const useInputs = (): FormInput[] => {
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
  const [formData, setFormData] = React.useState({ firstName: '', lastName: '', email: '', password: '', termsAndPolicyAccepted: false, language: defaultLanguage })
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

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    await registerUser({ variables: { input: formData } })
  }

  const inputs = useInputs()

  return (
    <div className='container-centered'>
      <div className='w-full max-w-lg'>
        <div className='card'>
          <div className='flex justify-center'>
            <img className='mb-2 text-center' width={150} src={Logo} alt='App logo' />
          </div>
          <form onSubmit={handleSubmit}>
            <FormInputs inputs={inputs} formData={formData} setFormData={setFormData} />
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
