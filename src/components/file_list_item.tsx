import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import downloadjs from 'downloadjs'
import TextTruncate from 'react-text-truncate'

import { useDeleteFile } from '../hooks/useDeleteFile'
import { api } from '../services/api'

import styles from '../styles/FileListItem.module.css'
import { Button } from './button'
import { File } from '../protocols/File'
import { toast } from 'react-toastify'
import { useTheme } from './theme'

interface Props {
  id: string
  filename: string
  size: string
  mimetype: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export const FileListItem: FC<Props> = ({ id, filename, size, mimetype, setFiles }) => {
  const { theme, themeType } = useTheme()

  const [isFileSelected, setIsFileSelected] = useState<boolean>(false)
  const [file, setFile] = useState<string>('')

  const checkboxClickHandler = () => {
    setIsFileSelected((previous) => !previous)
  }

  const { deleteFile } = useDeleteFile({ id })

  const deleteFileEvent = () => {
    deleteFile()
      .then()
      .catch(error => console.log(error))

    setFiles(previous => previous.filter(previous => previous.id !== id))
  }

  const downloadFileEvent = () => {
    downloadjs(file, filename, mimetype)

    toast.info('Your download will start soon')
  }

  useEffect(() => {
    void (async () => {
      const { data: fileBlob } = await api.get(`/file/${id}`)

      setFile(fileBlob)
    })()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.checkbox_container}>
          <input type="checkbox" checked={isFileSelected} hidden readOnly aria-hidden />
          <div
            className={styles.checkbox}
            onClick={checkboxClickHandler}
            onKeyDown={checkboxClickHandler}
            role='checkbox'
            tabIndex={0}
            aria-checked={isFileSelected}
          >
            {isFileSelected && <BsCheck color={theme['--text']} size={24} />}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.filename}>
            <TextTruncate
              text={filename}
            />
          </div>
          <div className={styles.filesize}>{size}</div>
        </div>
      </div>
      <div className={styles.actions}>
        {/* buttons */}
        <Button
          color="#FFF"
          backgroundColor={themeType === 'dark' ? theme['--secondary-background'] : '#CA5656'}
          // backgroundColor='#CA5656'
          borderRadius='24px'
          borderColor={themeType === 'dark' ? '#CA5656' : 'none'}
          onClick={deleteFileEvent}
        >Delete</Button>

        <Button color="#fff"
          // backgroundColor='#2965BF'
          backgroundColor={themeType === 'dark' ? theme['--secondary-background'] : '#2965BF'}
          borderRadius='24px'
          borderColor={themeType === 'dark' ? '#2965BF' : 'none'}
          onClick={downloadFileEvent}
        >
          Download
        </Button>
      </div>
    </div>
  )
}
