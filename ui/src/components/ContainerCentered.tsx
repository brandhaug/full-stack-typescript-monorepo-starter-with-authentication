import * as React from 'react'
import { cn } from '../utils/uiUtils'

export interface ContainerCenteredProps extends React.ButtonHTMLAttributes<HTMLDivElement> {}

const ContainerCentered = React.forwardRef<HTMLDivElement, ContainerCenteredProps>(({ children, className, ...props }, ref) => {
  return (
    <div className={cn('flex justify-center py-40 h-screen w-screen', className)} ref={ref} {...props}>
      <div className='w-full max-w-lg'>{children}</div>
    </div>
  )
})
// eslint-disable-next-line functional/immutable-data
ContainerCentered.displayName = 'ContainerCentered'

export { ContainerCentered }
