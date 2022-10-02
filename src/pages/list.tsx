/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable react/prop-types */
import { GetServerSideProps, NextPage } from 'next'
import prettyBytes from 'pretty-bytes'
import React, { CSSProperties } from 'react'

import { FileListItem } from '../components/file_list_item'
import { Header } from '../components/header'
import { useTheme } from '../components/theme'
import { useFiles } from '../hooks/useFiles'
import { File } from '../protocols/File'
import { api } from '../services/api'

import styles from '../styles/List.module.css'

interface PageProps {
  files: File[]
}

const List: NextPage<PageProps> = ({ files }) => {
  const { setFiles } = useFiles()
  const { theme } = useTheme()

  return (
    <div style={{ ...theme as CSSProperties }} className={styles.container_around}>
      <Header />
      <main className={styles.container}>
        <h2 className={styles.title}>Welcome $user</h2>

        {files.map(file => (
          <FileListItem
            key={file.id}
            id={file.id}
            filename={file.originalName}
            mimetype={file.type}
            size={prettyBytes(file.size)}
            setFiles={setFiles}
          />
        ))}
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await api.get('/file')

  return {
    props: {
      files: data
    }
  }
}

export default List