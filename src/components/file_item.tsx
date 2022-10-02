import { FC } from 'react'

import { motion } from 'framer-motion'
import TextTruncate from 'react-text-truncate'

import styles from '../styles/FileItem.module.css'
import FileIcon from './file_icon'

interface Props {
  file: File
}

const FileItem: FC<Props> = ({ file }) => {
  return (
    <motion.div initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: 'easeIn', duration: 0.2 }}
      className={styles.container}
    >
      <FileIcon type={file.type} />
      <div style={{ marginLeft: '5px' }}>
        <TextTruncate
          text={file.name}
        />
      </div>
    </motion.div>
  )
}

export default FileItem
