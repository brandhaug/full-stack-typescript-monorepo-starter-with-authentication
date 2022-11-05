import React, { MutableRefObject } from 'react'

export const useOutsideClick = (ref: MutableRefObject<HTMLDivElement | null>, callback: () => void): void => {
  const handleClick = (event: MouseEvent): void => {
    if (ref.current && event.target && !ref.current.contains(event.target as Node)) {
      callback()
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}
