import React from 'react'
import { Loader } from './Loader'

export const CenteredLoader = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <Loader width={60} height={60} {...props} />
    </div>
  )
}
