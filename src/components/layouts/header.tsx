import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'

import config from '../../data/config/website-config'
import t from '../../data/i18n'

import { colors } from './colors'
import LanguageToggle from '../languageToggle'
import { XanthousLogo } from '../svgs/xanthousLogo'

export default ({ titlePre, langKey, slug }) => {
  const { pathname } = useRouter()
  const linkPrefix = langKey

  const currentSlug = (exact, path) => {
    if (exact) {
      return pathname === exact || pathname === path ? 'bold' : ''
    }

    return pathname.includes(path) ? 'bold' : ''
  }

  return (
    <SiteHeader>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Xanthous Tech</title>
        <meta name="description" content={config.description} />
        <meta name="og:title" content={config.title} />
        <meta property="og:image" content={'../svgs/xanthousLogo'} />
        <meta name="twitter:site" content="@_ijjk" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={config.siteUrl} />
      </Head>
      <Wrapper>
        <SiteNavLeft>
          <SiteNavLogo>
            <XanthousLogo />
          </SiteNavLogo>
        </SiteNavLeft>
        <SiteNavRight>
          <NavStyles>
            {navItems.map(({ label, page, exact }) => (
              <MenuItem key={label} current={currentSlug(exact, page)}>
                <Link href={`/${linkPrefix}${page}`}>
                  <a>{label}</a>
                </Link>
              </MenuItem>
            ))}
            <li key="toggleLang">
              <LanguageToggle langKey={langKey} slug={slug} />
            </li>
          </NavStyles>
        </SiteNavRight>
      </Wrapper>
    </SiteHeader>
  )
}

const navItems: { label: string; page: string; exact?: string }[] = [
  { label: t['general.nav.home'](), page: '/', exact: '/[lang]' },
  { label: t['general.nav.projects'](), page: '/projects' },
  { label: t['general.nav.blog'](), page: '/blog' },
  { label: t['general.nav.about'](), page: '/about' },
  { label: t['general.nav.contact'](), page: '/contact' },
]

const SiteHeader = styled.header`
  position: relative;
  color: #fff;
  height: 50px;
  background: ${colors.gray};
  background-size: cover;
`

const Wrapper = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 12px 30px;
  display: flex;
  justify-content: space-between;
  align-content: center;
`

const SiteNavLeft = styled.div`
  display: flex;
  z-index: 900;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
  letter-spacing: 0.4px;
  white-space: nowrap;
  -ms-overflow-scrolling: touch;
`
const SiteNavRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 24px;

  @media (max-width: 700px) {
    display: none;
  }
`

const SiteNavLogo = styled.div`
  display: block;
  width: 100px;
  left: 0px;
  top: 2px;
`

const NavStyles = styled.ul`
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;

  li {
    display: block;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }
  li a {
    display: block;
    margin-left: 40px;
    color: #fff;
    opacity: 0.85;
    font-family: Saira;
    font-size: 16px;
  }
  li a:hover {
    text-decoration: none;
    opacity: 1;
  }
`

const MenuItem = styled.li<{ current: string }>`
  ${(props: any) => (props.current ? 'font-weight: 800;' : '')}
`
