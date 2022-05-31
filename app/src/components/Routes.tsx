import React from 'react'
import { Navigate, Outlet, Route, Routes as ReactRouterDomRoutes } from 'react-router-dom'
import { RoutePaths } from '../types/custom'
import { LoginView } from '../views/LoginView'
import { RegisterView } from '../views/RegisterView'
import { ForgotPasswordView } from '../views/ForgotPasswordView'
import { TermsAndConditionsView } from '../views/TermsAndConditionsView'
import { PrivacyPolicyView } from '../views/PrivacyPolicyView'
import { MainView } from '../views/MainView'
import { LogOutView } from '../views/LogOutView'
import { UserView } from '../views/UserView'
import { ContactUsView } from '../views/ContactUsView'
import { UpdatePasswordView } from '../views/UpdatePasswordView'
import { useIsAuthenticated } from '../utils/authenticationUtils'

const ProtectedRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to={RoutePaths.LOGIN} replace />
  }

  return <Outlet />
}

export const Routes = () => {
  const isAuthenticated = useIsAuthenticated()

  return (
    <ReactRouterDomRoutes>
      <Route path={RoutePaths.LOGIN} element={<LoginView />} />
      <Route path={RoutePaths.REGISTER} element={<RegisterView />} />
      <Route path={RoutePaths.FORGOT_PASSWORD} element={<ForgotPasswordView />} />
      <Route path={RoutePaths.UPDATE_PASSWORD} element={<UpdatePasswordView />} />
      <Route path={RoutePaths.TERMS_AND_CONDITIONS} element={<TermsAndConditionsView />} />
      <Route path={RoutePaths.PRIVACY_POLICY} element={<PrivacyPolicyView />} />
      <Route path={RoutePaths.CONTACT_US} element={<ContactUsView />} />
      <Route path={RoutePaths.LOGOUT} element={<LogOutView />} />
      <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
        <Route path={RoutePaths.MAIN} element={<MainView />} />
        <Route path={RoutePaths.USER} element={<UserView />} />
      </Route>
      <Route path='*' element={<MainView />} />
    </ReactRouterDomRoutes>
  )
}
