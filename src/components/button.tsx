import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import styles from '../styles/Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  backgroundColor?: string
  color?: string
  borderRadius?: string
  borderColor?: string
}

export const Button: FC<Props> = ({ children, backgroundColor = '#555', color = '#fff', borderRadius = '0px', borderColor, ...props }) => {
  return (
    <button {...props} className={styles.container} style={{ backgroundColor, color, borderRadius, border: `1px solid ${borderColor ?? backgroundColor}` }}>{children}</button>
  )
}
