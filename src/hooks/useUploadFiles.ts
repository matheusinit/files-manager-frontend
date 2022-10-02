import { useState } from 'react'
import { api } from '../services/api'

interface Params {
  files: File[]
}

export const useUploadFiles = () => {
  const [isDone, setIsDone] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const uploadFiles = async ({ files }: Params) => {
    setIsLoading(true)

    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file)
    })

    await api.post('/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    setIsDone(true)
    setIsLoading(false)
  }

  return { isDone, isLoading, uploadFiles }
}
