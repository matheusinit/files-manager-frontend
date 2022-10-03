/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from '../components/theme'
import { ToastWrapper } from '../components/toast_wrapper'

import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ToastWrapper />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
