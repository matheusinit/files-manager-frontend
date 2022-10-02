import { Dispatch, SetStateAction, useState } from 'react'
import { api } from '../services/api'

interface UploadFilesParams {
  files: File[]
}

interface Params {
  setProgress: Dispatch<SetStateAction<number>>
}

export const useUploadFiles = ({ setProgress }: Params) => {
  const [isDone, setIsDone] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const uploadFiles = async ({ files }: UploadFilesParams) => {
    setIsLoading(true)

    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file)
    })

    await api.post('/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent.loaded / progressEvent.total
        setProgress(progress)
      },
      onDownloadProgress (progressEvent) {
        const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50
        console.log(progress)
        setProgress(progress)
      }
    })

    setIsDone(true)
    setIsLoading(false)
  }

  return { isDone, isLoading, uploadFiles }
}
