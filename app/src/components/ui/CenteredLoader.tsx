import React from 'react'
import { Loader } from './Loader'

export const CenteredLoader = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <Loader width={60} height={60} {...props} />
    </div>
  )
}
