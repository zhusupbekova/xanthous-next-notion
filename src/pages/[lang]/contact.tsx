import Header from '../../components/layouts/header'
import ExtLink from '../../components/ext-link'

import sharedStyles from '../../styles/shared.module.css'
import contactStyles from '../../styles/contact.module.css'

import GitHub from '../../components/svgs/github'
import Twitter from '../../components/svgs/twitter'
import Envelope from '../../components/svgs/envelope'
import LinkedIn from '../../components/svgs/linkedin'
import { useRouter } from 'next/router'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: 'https://twitter.com/_ijjk',
  },
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/ijjk',
  },
  {
    Comp: LinkedIn,
    alt: 'linkedin icon',
    link: 'https://www.linkedin.com/in/jj-kasper-0b5392166/',
  },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: 'mailto:jj@jjsweb.site?subject=Notion Blog',
  },
]

export default () => {
  const router = useRouter()
  const { lang } = router.query
  return (
    <>
      <Header titlePre="Contact" langKey={lang} slug="/contact" />
      <div className={sharedStyles.layout}>
        <div className={contactStyles.avatar}>
          <img src="/avatar.png" alt="avatar with letters JJ" height={60} />
        </div>

        <h1 style={{ marginTop: 0 }}>Contact</h1>

        <div className={contactStyles.name}>
          JJ Kasper - Next.js Engineer @{' '}
          <ExtLink href="https://zeit.co">ZEIT</ExtLink>
        </div>

        <div className={contactStyles.links}>
          {contacts.map(({ Comp, link, alt }) => {
            return (
              <ExtLink key={link} href={link} aria-label={alt}>
                <Comp height={32} />
              </ExtLink>
            )
          })}
        </div>
      </div>
    </>
  )
}
