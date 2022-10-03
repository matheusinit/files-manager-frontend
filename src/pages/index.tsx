import type { NextPage } from 'next'
import Head from 'next/head'
import { CSSProperties, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import FileUploader from '../components/file_uploader'
import { Header } from '../components/header'
import { useTheme } from '../components/theme'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { theme, themeType } = useTheme()
  const [progress, setProgress] = useState<number>(0)
  const [showUploadedMessage, setShowUploadedMessage] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (progress === 1) {
      setShowUploadedMessage(true)
      setTimeout(() => {
        setShowUploadedMessage(false)
      }, 3000)
    }
  }, [progress])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

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
          <button onClick={openModal} className={themeType === 'light' ? styles.about_button : styles.about_button_dark}>About this app</button>
        </footer>
      </div>

      {progress < 1 && progress > 0 && (
        <div className={styles.progress_message}>Uploading file...</div>
      )}

      {(progress === 1 || showUploadedMessage) && (
        <div className={styles.uploaded_message}>Uploaded</div>
      )}

      <Transition show={isModalOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25'></div>
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-800'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-700 dark:text-gray-50'>
                    About this app
                  </Dialog.Title>

                  <div className='mt-2'>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      This is app is developed in Next.js and Node.js to test the abilities of the developer.

                      <p className='pt-4 text-xs'>Version 1.0</p>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Home
