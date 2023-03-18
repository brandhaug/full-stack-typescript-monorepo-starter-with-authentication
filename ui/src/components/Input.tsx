import React from 'react'
import { cn } from '../utils/uiUtils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string | JSX.Element
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ id, label, children, className, ...props }, ref) => {
  return (
    <div>
      <label>{label}</label>
      <input
        ref={ref}
        className={cn(
          'mb-2 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-400 focus:outline-none',
          className
        )}
        {...props}
      />
    </div>
  )
})
// eslint-disable-next-line functional/immutable-data
Input.displayName = 'Input'

export { Input }
