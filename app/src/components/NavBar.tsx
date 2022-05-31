import React, { useRef } from 'react'
import { useCurrentUser } from '../utils/currentUserUtils'
import { NavLink, useLocation } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { MenuIcon, UserCircleIcon } from '@heroicons/react/solid'
import { useOutsideClick } from '../utils/hooks'
import { useTranslation } from 'react-i18next'
import { useIsAuthenticated } from '../utils/authenticationUtils'

const useMainMenuItems = () => {
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

const useUserMenuItems = () => {
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

const UserMenu = () => {
  const currentUser = useCurrentUser()
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const toggleIsOpen = () => setIsOpen(prevIsOpen => !prevIsOpen)

  useOutsideClick(ref, () => setIsOpen(false))

  const userMenuItems = useUserMenuItems()

  if (!currentUser) return null

  return (
    <div className='hidden md:block relative' ref={ref}>
      <button type='button' className='flex mr-3 rounded-lg md:mr-0 text-gray-500 hover:bg-gray-100 p-3' onClick={toggleIsOpen}>
        <span className='sr-only'>Open user menu</span>
        <UserCircleIcon className='w-8 h-8' />
      </button>
      {isOpen && (
        <div className='absolute right-0 top-10 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow'>
          <div className='py-4 px-4'>
            <span className='block font-medium text-gray-500 truncate'>{currentUser.email}</span>
          </div>
          <ul className='py-1'>
            {userMenuItems.map(menuItem => {
              return (
                <li key={menuItem.to}>
                  <NavLink to={menuItem.to} className='block py-4 px-4 text-gray-700 hover:bg-gray-100' onClick={toggleIsOpen}>
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

const Brand = () => {
  return (
    <NavLink to={RoutePaths.MAIN} className='flex items-center'>
      <img src='../assets/logo_no-bg_cropped.png' className='mr-3 h-9' alt='App logo' />
      <span className='self-center text-xl font-semibold whitespace-nowrap'>App</span>
    </NavLink>
  )
}

const MobileMainMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const toggleIsOpen = () => setIsOpen(prevIsOpen => !prevIsOpen)

  const mainMenuItems = useMainMenuItems()
  const userMenuItems = useUserMenuItems()

  useOutsideClick(ref, () => setIsOpen(false))

  return (
    <div className='md:hidden relative' ref={ref}>
      <button type='button' className='flex rounded-lg md:mr-0 text-gray-500 hover:bg-gray-100 p-3' onClick={toggleIsOpen}>
        <MenuIcon className='h-8' />
      </button>
      {isOpen && (
        <div className='absolute right-0 top-10 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow'>
          <ul className='py-1'>
            {[...mainMenuItems, ...userMenuItems].map(menuItem => {
              return (
                <li key={menuItem.to}>
                  <NavLink to={menuItem.to} className='w-40 block py-4 px-4 text-gray-700 hover:bg-gray-100' onClick={toggleIsOpen}>
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

const MainMenu = () => {
  const location = useLocation()
  const mainMenuItems = useMainMenuItems()

  return (
    <div className='hidden md:block items-center w-full flex w-auto ml-10'>
      <ul className='flex flex-col md:flex-row md:space-x-0'>
        {mainMenuItems.map(menuItem => {
          const isActive = location.pathname === menuItem.to
          return (
            <li key={menuItem.to}>
              <NavLink to={menuItem.to} className={`block py-4 pr-4 pl-3 text-lg border-b-4 hover:bg-gray-100 ${isActive ? 'border-blue-400' : 'border-transparent'}`}>
                {menuItem.title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const NavBar = () => {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) return null

  return (
    <nav className='bg-white shadow-sm px-2 sm:px-4'>
      <div className='flex flex-wrap items-center mx-auto w-full'>
        <Brand />
        <MainMenu />
        <div className='flex items-center ml-auto'>
          <UserMenu />
          <MobileMainMenu />
        </div>
      </div>
    </nav>
  )
}
