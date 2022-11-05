import React from 'react'
import { Loader } from './Loader'

export const ButtonLoader = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return <Loader width={16} height={16} {...props} />
}
