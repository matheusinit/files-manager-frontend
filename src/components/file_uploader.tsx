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
        <button className={themeType === 'light' ? styles.reset_button : styles.reset_button_dark} onClick={resetFiles}>Cancel</button>
        <button className={themeType === 'light' ? styles.upload_button : styles.upload_button_dark} onClick={onUpload}>Upload</button>
      </div>
    </>
  )
}

export default FileUploader
