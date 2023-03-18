import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/uiUtils'
import { Loader } from '../Loader'
import { buttonVariants } from './buttonVariants'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, variant, size, loading, disabled, ...props }, ref) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={disabled ?? loading} {...props}>
      {loading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
      {!loading && children}
    </button>
  )
})
// eslint-disable-next-line functional/immutable-data
Button.displayName = 'Button'

export { Button, type ButtonProps }
