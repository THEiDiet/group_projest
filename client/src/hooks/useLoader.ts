import { useState } from 'react'

export const useLoader = (): {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
} => {
  const [isLoading, setIsFetching] = useState(false)
  const stopLoading = (): void => {
    setIsFetching(false)
  }
  const startLoading = (): void => {
    setIsFetching(true)
  }
  return { isLoading, startLoading, stopLoading }
}
