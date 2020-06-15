import React from 'react'
import Link from 'next/link'
import DoubleArrow from '../components/svgs/doubleArrow'
import styles from '../styles/langToggle.module.css'

export interface LanguageToggleProps {
  langKey: string
  slug?: string
}

const LanguageToggle: React.FunctionComponent<LanguageToggleProps> = props => {
  return (
    <Link href={`/${props.langKey === 'en' ? 'zh' : 'en'}${props.slug || ''}`}>
      <div className={styles.wrapper}>
        {props.langKey === 'en' ? '中文' : 'English'}
        <DoubleArrow />
      </div>
    </Link>
  )
}

export default LanguageToggle
