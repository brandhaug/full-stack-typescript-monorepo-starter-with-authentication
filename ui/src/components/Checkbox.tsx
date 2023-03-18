import React from 'react'
import { cn } from '../utils/uiUtils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string | JSX.Element
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ id, label, children, className, ...props }, ref) => {
  return (
    <div className='my-2 flex align-middle'>
      <input
        ref={ref}
        className={cn(
          'w-6 h-6 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer mr-2'
        )}
        type='checkbox'
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
})
// eslint-disable-next-line functional/immutable-data
Checkbox.displayName = 'Checkbox'

export { Checkbox }
