import React from 'react'
import { useMutation } from '@apollo/client'
import { UpdatePasswordMutation, UpdatePasswordMutationVariables } from '../types/graphql'
import UPDATE_PASSWORD from '../graphql/users/mutations/updatePassword.graphql'
import { toast } from 'react-hot-toast'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useSaveAuthenticationToken } from '../utils/authenticationUtils'
import { useTranslation } from 'react-i18next'

const useInputs = () => {
  const { t } = useTranslation()

  return [
    {
      key: 'password',
      type: 'password',
      label: t('New password'),
      minLength: 6
    }
  ]
}

export const UpdatePasswordView = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = React.useState({ password: '' })
  const [searchParams] = useSearchParams()

  const saveAuthenticationToken = useSaveAuthenticationToken()

  const navigate = useNavigate()

  const handleUpdatePasswordCompleted = (data: UpdatePasswordMutation) => {
    if (!data?.updatePassword) {
      toast.error(t('Something went wrong'))
      return
    }

    saveAuthenticationToken(data.updatePassword)
    navigate(RoutePaths.MAIN)
  }

  const [updatePassword, { loading }] = useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UPDATE_PASSWORD, { onCompleted: handleUpdatePasswordCompleted })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const id = searchParams.get('id')
    const token = searchParams.get('token')

    if (!id || !token) {
      toast.error(t('Invalid link'))
      return
    }

    updatePassword({ variables: { id, token, input: formData } })
  }

  const inputs = useInputs()

  return (
    <div className='container-centered'>
      <div className='w-full max-w-lg'>
        <div className='card'>
          <div className='flex justify-center'>
            <img className='mb-2 text-center' width={150} src='../assets/logo_no-bg_cropped.png' alt='App logo' />
          </div>
          <form onSubmit={handleSubmit}>
            <FormInputs inputs={inputs} formData={formData} setFormData={setFormData} />
            <button className='w-full btn btn-primary mt-4' type='submit' disabled={loading}>
              {t('Create new password')}
            </button>
            <p className='text-center mt-8'>
              {t('Do you remember your password')}?&nbsp;
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
