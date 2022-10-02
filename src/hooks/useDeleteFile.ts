import { useState } from 'react'
import { api } from '../services/api'

interface Params {
  id: string
}

export const useDeleteFile = ({ id }: Params) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const deleteFile = async () => {
    setIsLoading(true)

    await api.delete(`/file/${id}`)

    setIsLoading(false)
  }

  return { isLoading, deleteFile }
}
