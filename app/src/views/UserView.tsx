import { FormInput, FormInputs } from '../components/FormInputs'
import React from 'react'
import { Language, useUpdateUserMutation } from '../types/graphql'
import { ButtonLoader } from '../components/ui/ButtonLoader'
import { toast } from 'react-hot-toast'
import { useCurrentUser } from '../utils/currentUserUtils'
import { useTranslation } from 'react-i18next'
import { useDependencyState } from '../utils/stateHooks'

const languageOptions = [
  {
    value: Language.Norwegian,
    label: 'Norsk'
  },
  {
    value: Language.English,
    label: 'English'
  }
]

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
      key: 'language',
      type: 'select',
      label: t('Language'),
      options: languageOptions
    }
  ]
}

export const UserView = (): JSX.Element | null => {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()

  const defaultValue = { firstName: currentUser?.firstName ?? '', lastName: currentUser?.lastName ?? '', language: currentUser?.language ?? Language.English }
  const [formData, setFormData] = useDependencyState(defaultValue, [JSON.stringify(currentUser)])

  const handleCompleted = (): void => {
    toast.success(t('User updated'))
  }
  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation({ onCompleted: handleCompleted })

  const inputs = useInputs()

  if (!currentUser) return null

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    await updateUser({ variables: { id: currentUser.id, input: formData } })
  }

  return (
    <div className='flex justify-center py-12'>
      <form className='max-w-lg' onSubmit={handleSubmit}>
        <FormInputs inputs={inputs} formData={formData} setFormData={setFormData} />
        <button className='w-full btn btn-primary' type='submit' disabled={updateUserLoading}>
          {updateUserLoading && <ButtonLoader className='inline mr-2' />}
          {t('Update')}
        </button>
      </form>
    </div>
  )
}
