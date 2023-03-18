import React from 'react'
import { type UpdatePasswordMutation } from '../types/graphqlTypes'
import { toast } from 'react-hot-toast'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { FormInputs } from '../components/FormInputs'
import { TermsAndPrivacy } from '../components/TermsAndPrivacy'
import { useSaveAuthenticationToken } from '../utils/authenticationUtils'
import { useTranslation } from 'react-i18next'
import { useUpdatePasswordMutation } from '../types/graphqlOperations'
import { useForm } from 'react-hook-form'
import { type Form, type FormInput } from '../types/form'
import { Button, Card, ContainerCentered } from '@fstmswa/ui'
import { LogoCentered } from '../components/LogoCentered'

interface UpdatePasswordForm extends Form {
  password: string
}

const useInputs = (): Array<FormInput<UpdatePasswordForm>> => {
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

export const UpdatePasswordView = (): JSX.Element => {
  const { t } = useTranslation()
  const formData = useForm<UpdatePasswordForm>()
  const [searchParams] = useSearchParams()

  const saveAuthenticationToken = useSaveAuthenticationToken()

  const navigate = useNavigate()

  const handleUpdatePasswordCompleted = (data: UpdatePasswordMutation): void => {
    saveAuthenticationToken(data.updatePassword.authenticationToken)
    navigate(RoutePaths.MAIN)
  }

  const [updatePassword, { loading }] = useUpdatePasswordMutation({ onCompleted: handleUpdatePasswordCompleted })

  const handleUpdate = async (input: UpdatePasswordForm): Promise<void> => {
    const id = searchParams.get('id')
    const token = searchParams.get('token')

    if (!id || !token) {
      toast.error(t('Invalid link'))
      return
    }

    await updatePassword({ variables: { id, token, input } })
  }

  const inputs = useInputs()

  return (
    <ContainerCentered>
      <Card>
        <LogoCentered />
        <form onSubmit={formData.handleSubmit(handleUpdate)}>
          <FormInputs inputs={inputs} formData={formData} />
          <Button size='lg' className='mt-4 w-full' type='submit' loading={loading}>
            {t('Create new password')}
          </Button>
          <p className='mt-8 text-center'>
            {t('Do you remember your password')}?&nbsp;
            <NavLink className='text-blue-600' to={RoutePaths.LOGIN}>
              {t('Log in')}
            </NavLink>
          </p>
        </form>
      </Card>
      <TermsAndPrivacy />
    </ContainerCentered>
  )
}
