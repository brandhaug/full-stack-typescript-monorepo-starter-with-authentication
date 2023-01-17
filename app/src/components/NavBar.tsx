import React, { useRef } from 'react'
import { useCurrentUser } from '../utils/currentUserUtils'
import { NavLink, useLocation } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { useOutsideClick } from '../utils/hooks'
import { useTranslation } from 'react-i18next'
import { useIsAuthenticated } from '../utils/authenticationUtils'
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid'
import Logo from '../assets/logo_no-bg_cropped.png'

const useMainMenuItems = (): Array<{ title: string; to: RoutePaths }> => {
  const { t } = useTranslation()
  return [
    {
      title: t('Dashboard'),
      to: RoutePaths.MAIN
    },
    {
      title: t('Contact us'),
      to: RoutePaths.CONTACT_US
    }
  ]
}

const useUserMenuItems = (): Array<{ title: string; to: RoutePaths }> => {
  const { t } = useTranslation()

  return [
    {
      title: t('My account'),
      to: RoutePaths.USER
    },
    {
      title: t('Log out'),
      to: RoutePaths.LOGOUT
    }
  ]
}

const UserMenu = (): JSX.Element | null => {
  const currentUser = useCurrentUser()
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const toggleIsOpen = (): void => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const handleClose = (): void => {
    setIsOpen(false)
  }
  useOutsideClick(ref, handleClose)

  const userMenuItems = useUserMenuItems()

  if (!currentUser) return null

  return (
    <div className='relative hidden md:block' ref={ref}>
      <button type='button' className='mr-3 flex rounded-lg p-3 text-gray-500 hover:bg-gray-100 md:mr-0' onClick={toggleIsOpen}>
        <span className='sr-only'>Open user menu</span>
        <UserCircleIcon className='h-8 w-8' />
      </button>
      {isOpen && (
        <div className='absolute right-0 top-10 z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow'>
          <div className='p-4'>
            <span className='block truncate font-medium text-gray-500'>{currentUser.email}</span>
          </div>
          <ul className='py-1'>
            {userMenuItems.map((menuItem) => {
              return (
                <li key={menuItem.to}>
                  <NavLink to={menuItem.to} className='block p-4 text-gray-700 hover:bg-gray-100' onClick={toggleIsOpen}>
                    {menuItem.title}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

const Brand = (): JSX.Element => {
  return (
    <NavLink to={RoutePaths.MAIN} className='flex items-center'>
      <img src={Logo} className='mr-3 h-9' alt='App logo' />
      <span className='self-center whitespace-nowrap text-xl font-semibold'>App</span>
    </NavLink>
  )
}

const MobileMainMenu = (): JSX.Element | null => {
  const currentUser = useCurrentUser()
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const toggleIsOpen = (): void => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const mainMenuItems = useMainMenuItems()
  const userMenuItems = useUserMenuItems()

  const handleClose = (): void => {
    setIsOpen(false)
  }
  useOutsideClick(ref, handleClose)

  if (!currentUser) return null

  return (
    <div className='relative md:hidden' ref={ref}>
      <button type='button' className='flex rounded-lg p-3 text-gray-500 hover:bg-gray-100 md:mr-0' onClick={toggleIsOpen}>
        <Bars3Icon className='h-8' />
      </button>
      {isOpen && (
        <div className='absolute right-0 top-10 z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow'>
          <ul className='py-1'>
            {[...mainMenuItems, ...userMenuItems].map((menuItem) => {
              return (
                <li key={menuItem.to}>
                  <NavLink to={menuItem.to} className='block w-40 p-4 text-gray-700 hover:bg-gray-100' onClick={toggleIsOpen}>
                    {menuItem.title}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

const MainMenu = (): JSX.Element => {
  const location = useLocation()
  const mainMenuItems = useMainMenuItems()

  return (
    <div className='ml-10 flex w-full items-center md:block'>
      <ul className='flex flex-col md:flex-row md:space-x-0'>
        {mainMenuItems.map((menuItem) => {
          const isActive = location.pathname === menuItem.to
          return (
            <li key={menuItem.to}>
              <NavLink to={menuItem.to} className={`block border-b-4 py-4 pr-4 pl-3 text-lg hover:bg-gray-100 ${isActive ? 'border-blue-400' : 'border-transparent'}`}>
                {menuItem.title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const NavBar = (): JSX.Element | null => {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) return null

  return (
    <nav className='bg-white px-2 shadow-sm sm:px-4'>
      <div className='mx-auto flex w-full flex-wrap items-center'>
        <Brand />
        <MainMenu />
        <div className='ml-auto flex items-center'>
          <UserMenu />
          <MobileMainMenu />
        </div>
      </div>
    </nav>
  )
}
