import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { AuthenticationContextProvider } from './contexts/AuthenticationContext'
import { ApolloClientProvider } from './components/apollo/ApolloProvider'
import { Routes } from './components/Routes'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { UserContextProvider } from './contexts/UserContext'
import { LanguageContextProvider } from './contexts/LanguageContext'

export const AppContent = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <NavBar />
      <main className='mb-auto'>
        <Routes />
      </main>
      <Footer />
    </div>
  )
}

export const App = () => {
  return (
    <BrowserRouter>
      <AuthenticationContextProvider>
        <ApolloClientProvider>
          <UserContextProvider>
            <LanguageContextProvider>
              <React.Suspense fallback='Loading'>
                <AppContent />
                <Toaster position='top-right' />
              </React.Suspense>
            </LanguageContextProvider>
          </UserContextProvider>
        </ApolloClientProvider>
      </AuthenticationContextProvider>
    </BrowserRouter>
  )
}
