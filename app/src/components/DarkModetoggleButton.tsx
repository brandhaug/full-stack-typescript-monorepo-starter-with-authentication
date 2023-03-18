import React from 'react'
import { ButtonIcon } from '@fstmswa/ui'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useDarkMode } from 'usehooks-ts'

export const DarkModeToggleButton = (): JSX.Element => {
  const { isDarkMode, toggle } = useDarkMode(false)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <ButtonIcon variant='ghost' onClick={toggle}>
      {isDarkMode ? <MoonIcon className='h-5 w-5' /> : <SunIcon className='h-5 w-5' />}
    </ButtonIcon>
  )
}
