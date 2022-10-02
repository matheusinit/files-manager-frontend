import type { NextPage } from 'next'
import Head from 'next/head'
import { CSSProperties, useEffect, useState } from 'react'

import FileUploader from '../components/file_uploader'
import { Header } from '../components/header'
import { useTheme } from '../components/theme'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { theme, themeType } = useTheme()
  const [progress, setProgress] = useState<number>(0)
  const [showUploadedMessage, setShowUploadedMessage] = useState<boolean>(false)

  useEffect(() => {
    if (progress === 1) {
      setShowUploadedMessage(true)
      setTimeout(() => {
        setShowUploadedMessage(false)
      }, 3000)
    }
  }, [progress])

  return (
    <div style={{ ...theme as CSSProperties }}>
      <Head>
        <title>Files Manager</title>
      </Head>

      <div className={styles.container}>
        <Header />

        <main>
          <div className={styles.file_uploaded_container}>
            <FileUploader setProgress={setProgress} />
          </div>
        </main>

        <footer>
          <button className={themeType === 'light' ? styles.about_button : styles.about_button_dark}>About this app</button>
        </footer>
      </div>

      {progress < 1 && progress > 0 && (
        <div className={styles.progress_message}>Uploading file...</div>
      )}

      {(progress === 1 || showUploadedMessage) && (
        <div className={styles.uploaded_message}>Uploaded</div>
      )}
    </div>
  )
}

export default Home
