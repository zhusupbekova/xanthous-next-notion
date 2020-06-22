import React from 'react'
import Link from 'next/link'
import Header from '../../../components/layouts/header'

import sharedStyles from '../../../styles/shared.module.css'
// import IndexLayout from '../components/layouts'

import { techStackData } from '../../../data/texts'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const { lang } = router.query
  return (
    <>
      <Header titlePre="About" langKey="en" slug="/about" />
      <div className={sharedStyles.layout}>
        <img
          src="/zeit-and-notion.png"
          height="85"
          width="250"
          alt="Vercel + Notion"
        />
        <h1>About page</h1>
        <h2>Tech Stack </h2>

        <div className="explanation">
          {techStackData.map(stack => (
            <div className="item" key={stack.id}>
              <Link href={`/${lang}/about/${stack.id}`}>
                <a>
                  <img
                    // className={`${AuthorProfileImage} item-image`}
                    src={stack.logo}
                    alt={stack.name}
                  />
                </a>
              </Link>

              <h3 className="item-name">{stack.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
