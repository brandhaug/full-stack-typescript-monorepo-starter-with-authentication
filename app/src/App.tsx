import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { AuthenticationContextProvider } from './contexts/AuthenticationContext'
import { ApolloClientProvider } from './components/apollo/ApolloProvider'
import { Routes } from './components/Routes'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { CurrentUserContextProvider } from './contexts/CurrentUserContext'
import { LanguageContextProvider } from './contexts/LanguageContext'

export const AppContent = (): JSX.Element | null => {
  return (
    <>
      <NavBar />
      <div className='h-screen bg-gray-50 dark:bg-gray-900'>
        <main className='mb-auto'>
          <Routes />
        </main>
      </div>
      <Footer />
    </>
  )
}

export const App = (): JSX.Element | null => {
  return (
    <BrowserRouter>
      <AuthenticationContextProvider>
        <ApolloClientProvider>
          <CurrentUserContextProvider>
            <LanguageContextProvider>
              <React.Suspense fallback='Loading'>
                <AppContent />
                <Toaster position='top-right' />
              </React.Suspense>
            </LanguageContextProvider>
          </CurrentUserContextProvider>
        </ApolloClientProvider>
      </AuthenticationContextProvider>
    </BrowserRouter>
  )
}
