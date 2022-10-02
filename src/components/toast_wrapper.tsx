import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { useTheme } from './theme'

export const ToastWrapper = () => {
  const { themeType } = useTheme()

  return (
    <ToastContainer
      position='top-right'
      autoClose={3000}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      theme={themeType}
    />
  )
}
