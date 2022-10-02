import { useState } from 'react'
import { File } from '../protocols/File'
import { api } from '../services/api'

export const useFiles = () => {
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getFiles = async () => {
    setIsLoading(true)

    const { data } = await api.get('/file')

    setFiles(data)

    setIsLoading(false)
  }

  return { files, isLoading, getFiles, setFiles }
}
