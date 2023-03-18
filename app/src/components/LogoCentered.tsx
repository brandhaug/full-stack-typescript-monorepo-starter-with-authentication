import React from 'react'
import Logo from '../assets/logo_no-bg_cropped.png'
import { cn } from '@fstmswa/ui'

export interface LogoCenteredProps extends React.ButtonHTMLAttributes<HTMLImageElement> {}

export const LogoCentered = ({ children, className, ...props }: LogoCenteredProps): JSX.Element => {
  return (
    <div className={cn('flex justify-center')}>
      <img className={cn('mb-2 text-center', className)} {...props} width={150} src={Logo} alt='App logo' />
    </div>
  )
}
