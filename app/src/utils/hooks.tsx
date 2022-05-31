import React, { MutableRefObject } from 'react'

export const useOutsideClick = (ref: MutableRefObject<HTMLDivElement | null>, callback: () => void) => {
  const handleClick = (event: MouseEvent) => {
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
