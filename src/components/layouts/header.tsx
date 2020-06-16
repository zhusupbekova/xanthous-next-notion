import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import config from '../../data/config/website-config'

import styled from 'styled-components'
import { css } from 'emotion'
import { colors } from './colors'
import LanguageToggle from '../languageToggle'
import t from '../../data/i18n'
import { XanthousLogo } from '../svgs/xanthousLogo'

const SiteHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 12px 60px;
  color: #fff;
  height: 50px;
  background: ${colors.gray};
  background-size: cover;
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
    margin: 0;
    padding: 10px 12px;
    color: #fff;
    opacity: 0.8;
  }
  li a:hover {
    text-decoration: none;
    opacity: 1;
  }
`

const bold = css`
  font-weight: 800;
`

const navItems: { label: string; page: string; exact?: string }[] = [
  { label: t['general.nav.home'](), page: '/', exact: '/[lang]' },
  { label: t['general.nav.projects'](), page: '/projects' },
  { label: t['general.nav.blog'](), page: '/blog' },
  { label: t['general.nav.about'](), page: '/about' },
  { label: t['general.nav.contact'](), page: '/contact' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

export default ({ titlePre, langKey, slug }) => {
  const { pathname } = useRouter()
  const linkPrefix = langKey

  const currentSlug = (exact, path) => {
    // if (typeof window === 'undefined') {
    //   return
    // }
    console.log(path)
    if (exact) {
      return pathname === exact || pathname === path ? `${bold}` : ''
    }

    return pathname.includes(path) ? `${bold}` : ''
  }

  return (
    <SiteHeader>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Xanthous Tech</title>
        <meta name="description" content={config.description} />
        <meta name="og:title" content="My Notion Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@_ijjk" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={config.siteUrl} />
      </Head>
      <SiteNavLeft>
        <SiteNavLogo>
          <XanthousLogo />
        </SiteNavLogo>
      </SiteNavLeft>
      <SiteNavRight>
        <NavStyles>
          {navItems.map(({ label, page, exact }) => (
            <li key={label} className={currentSlug(exact, `${page}`)}>
              <Link href={`/${linkPrefix}${page}`}>
                <a>{label}</a>
              </Link>
            </li>
          ))}
          <li>
            <LanguageToggle langKey={langKey} slug={slug} />
          </li>
        </NavStyles>
      </SiteNavRight>
    </SiteHeader>
  )
}

const SiteNavItem: React.FC<{
  path: string
  label: string
  exact?: boolean
}> = ({ label, path, exact }) => {
  const currentSlug = () => {
    if (typeof window === 'undefined') {
      return
    }

    if (exact) {
      return window.location.pathname === path ? `${bold}` : ''
    }

    return window.location.pathname.includes(path) ? `${bold}` : ''
  }

  return (
    <li className={currentSlug()} role="menuitem">
      <Link href={path}>
        <a>{label}</a>
      </Link>
    </li>
  )
}

{
  /* <SiteNavItem
            label={t['general.nav.home']()}
            path={`/${linkPrefix}/`}
            exact={true}
          />
          <SiteNavItem
            label={t['general.nav.projects']()}
            path={`/${linkPrefix}/projects`}
          />
          <SiteNavItem
            label={t['general.nav.blog']()}
            path={`/${linkPrefix}/blog`}
          />
          <SiteNavItem
            label={t['general.nav.about']()}
            path={`/${linkPrefix}/about`}
          />
          <SiteNavItem
            label={t['general.nav.contact']()}
            path={`/${linkPrefix}/contact`}
          /> */
}
