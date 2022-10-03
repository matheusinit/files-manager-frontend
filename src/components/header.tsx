import Link from 'next/link'
import { BsList, BsUpload } from 'react-icons/bs'
import { useRouter } from 'next/router'

import { ThemeButton } from './theme-button'

import styles from '../styles/Header.module.css'
import { useTheme } from './theme'

export const Header = () => {
  const { pathname } = useRouter()
  const { theme } = useTheme()

  return (
    <header className={styles.container}>
      <h3 className='text-xl font-medium'>
        <Link href='/'>Files Manager</Link>
      </h3>

      <nav className={styles.btn_action_container}>
        {pathname === '/' && (
          <button>
            <Link href='/list'>
              <BsList
                size={20}
                style={{ color: `${theme['--text']}` }} />
            </Link>
          </button>
        )}

        {pathname === '/list' && (
          <button>
            <Link href='/'>
              <BsUpload size={20} style={{ color: `${theme['--text']}` }} />
            </Link>
          </button>
        )}

        <button>
          <ThemeButton />
        </button>
      </nav>
    </header>
  )
}
