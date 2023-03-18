import * as React from 'react'
import { cn } from '../utils/uiUtils'

export interface CardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg p-12 pt-8 drop-shadow-lg', className)} ref={ref} {...props}>
      {children}
    </div>
  )
})
// eslint-disable-next-line functional/immutable-data
Card.displayName = 'Card'

export { Card }
