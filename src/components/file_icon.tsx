import type { FC } from 'react'

import IconSet from '../assets/svg/selection.json'

import IconMoon, { IconProps } from 'react-icomoon'
import { useTheme } from './theme'

const Icon = (props: IconProps) => (
  <IconMoon iconSet={IconSet} {...props} />
)

interface Props {
  type: string
}

const FileIcon: FC<Props> = ({ type }) => {
  const { theme } = useTheme()

  switch (type) {
    case 'image/png': return (
      <Icon icon="file-png" size={20} color={theme['--text']} />
    )

    case 'application/pdf': return (
      <Icon icon="file-pdf" size={20} color={theme['--text']} />
    )

    default: return (
      <Icon icon="file" size={20} color={theme['--text']} />
    )
  }
}

export default FileIcon
