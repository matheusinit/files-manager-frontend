import {
  ChangeEvent,
  CSSProperties,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState
} from 'react'

import { BsPlusSquare } from 'react-icons/bs'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import styles from '../styles/FileUploader.module.css'
import FileItem from './file_item'
import { useUploadFiles } from '../hooks/useUploadFiles'
import { useTheme } from './theme'

const iconStyles: CSSProperties = {
  marginBottom: '10px'
}

interface Props {
  setProgress: Dispatch<SetStateAction<number>>
}

const FileUploader: FC<Props> = ({ setProgress }) => {
  const { theme, themeType } = useTheme()
  const [files, setFiles] = useState<File[]>([])

  const { uploadFiles } = useUploadFiles({ setProgress })

  const resetFiles = (): void => setFiles([])

  const onUpload = (): void => {
    if (files.length === 0) {
      toast.warn('There is no file to upload')
      return
    }

    uploadFiles({ files }).then(() => {
      toast.success('Files uploaded')
      resetFiles()
    }).catch((error) => {
      toast.error('Something wrong happened...', {
        pauseOnHover: true
      })
      console.log(error)
    })
  }

  const inputFileOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const fileList = event.target.files
    const files: File[] = []

    if (fileList == null) return

    for (let i = 0; i < fileList?.length; i++) {
      const file = fileList.item(i)

      if (file != null) {
        files.push(file)
      }
    }

    setFiles(previous => [...previous, ...files])
  }

  const onDrop = useCallback((acceptedFiles: File[]) =>
    setFiles(previous => [...previous, ...acceptedFiles])
  , [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <div className={styles.outer} style={themeType === 'dark' ? { boxShadow: 'none', backgroundColor: `${theme['--ternary-background'] ?? ''}` } : {}}>
        <div className={styles.container} {...getRootProps()}>
          <input {...getInputProps()} onChange={inputFileOnChange} />

          {isDragActive
            ? (<div>Drop files in here</div>)
            : (
              <div className={styles.file_upload_box}>
                <BsPlusSquare size={35} style={iconStyles} />
                <span>Click or drop files</span>
              </div>
            )}
        </div>
      </div>

      {files.length > 0 && (
        <div className={styles.file_list}>
          {files.map(file => (
            <FileItem key={file.size} file={file} />
          ))}
        </div>
      )}

      <div className={styles.button_container}>
        <button
          className='h-10 border border-solid border-custom-red bg-custom-red py-2 px-6 text-white delay-200 ease-in-out hover:bg-red-700 hover:text-gray-200 dark:bg-transparent'
          onClick={resetFiles}>Cancel</button>
        <button
          className='bg-primary py-2 px-6 text-white transition-all delay-200 ease-in-out hover:text-gray-200 dark:border dark:border-solid dark:border-neutral-600 dark:bg-transparent'
          onClick={onUpload}>Upload</button>
      </div>
    </>
  )
}

export default FileUploader
