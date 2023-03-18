import * as React from 'react'
import { cn } from '../../utils/uiUtils'
import { Button, type ButtonProps } from './Button'

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...props }, ref) => {
  return (
    <Button className={cn(className, 'p-2')} ref={ref} {...props}>
      {children}
    </Button>
  )
})
// eslint-disable-next-line functional/immutable-data
ButtonIcon.displayName = 'ButtonIcon'

export { ButtonIcon }
