import { FormInputs } from '../components/FormInputs'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useCurrentUser } from '../utils/currentUserUtils'
import { useTranslation } from 'react-i18next'
import { Language } from '@fstmswa/types'
import { useUpdateUserMutation } from '../types/graphqlOperations'
import { useForm } from 'react-hook-form'
import { type Form, type FormInput } from '../types/form'
import { Button } from '@fstmswa/ui'

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

interface UserForm extends Form {
  firstName: string
  lastName: string
  language: Language
}

const useInputs = (): Array<FormInput<UserForm>> => {
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

  const formData = useForm<UserForm>()

  React.useEffect(() => {
    if (!currentUser) return

    const defaultValues = { firstName: currentUser.firstName, lastName: currentUser.lastName, language: currentUser.language }
    formData.reset(defaultValues)
  }, [currentUser])

  const handleCompleted = (): void => {
    toast.success(t('User updated'))
  }
  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation({ onCompleted: handleCompleted })

  const inputs = useInputs()

  if (!currentUser) return null

  const handleUpdate = async (input: UserForm): Promise<void> => {
    await updateUser({ variables: { id: currentUser.id, input } })
  }

  return (
    <div className='flex justify-center py-12'>
      <form className='max-w-lg' onSubmit={formData.handleSubmit(handleUpdate)}>
        <FormInputs inputs={inputs} formData={formData} />
        <Button size='lg' className='w-full' type='submit' loading={updateUserLoading}>
          {t('Update')}
        </Button>
      </form>
    </div>
  )
}
