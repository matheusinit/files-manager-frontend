import type { NextPage } from 'next'
import Head from 'next/head'
import { CSSProperties } from 'react'

import FileUploader from '../components/file_uploader'
import { Header } from '../components/header'
import { useTheme } from '../components/theme'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { theme, themeType } = useTheme()

  return (
    <div style={{ ...theme as CSSProperties }}>
      <Head>
        <title>Files Manager</title>
      </Head>

      <div className={styles.container}>
        <Header />

        <main>
          <div className={styles.file_uploaded_container}>
            <FileUploader />
          </div>
        </main>

        <footer>
          <button className={themeType === 'light' ? styles.about_button : styles.about_button_dark}>About this app</button>
        </footer>
      </div>
    </div>
  )
}

export default Home
