import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
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
  height: 18.8px;
  left: 0px;
  top: 2px;
`

const NavStyles = styled.ul`
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;
`
const SiteNavItem = styled.li`
  /* display: block; */
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`
const MenuLink = styled.a`
  /* display: block; */
  margin: 0;
  padding-left: 60px;
  color: #fff;
  opacity: 0.85;
  font-family: Saira;
  font-size: 16px;
  line-height: 12px;

  @media (max-width: 1000px) {
    padding-left: 30px;
  }

  :hover {
    text-decoration: none;
    cursor: pointer;
  }
`

const navItems: { label: string; page: string; exact?: boolean }[] = [
  { label: t['general.nav.home'](), page: '/', exact: true },
  { label: t['general.nav.projects'](), page: '/projects' },
  { label: t['general.nav.blog'](), page: '/blog' },
  { label: t['general.nav.about'](), page: '/about' },
  { label: t['general.nav.contact'](), page: '/contact' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

export default ({ titlePre = '', langKey = '', slug = '' }) => {
  const { pathname } = useRouter()
  const linkPrefix = langKey === 'en' ? '' : langKey

  return (
    <SiteHeader>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Xanthous Tech</title>
        <meta
          name="description"
          content="An example Next.js site using Notion for the blog"
        />
        <meta name="og:title" content="My Notion Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@_ijjk" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <SiteNavLeft>
        <SiteNavLogo>
          <XanthousLogo />
        </SiteNavLogo>
      </SiteNavLeft>
      <SiteNavRight>
        <NavStyles>
          {navItems.map(({ label, page, exact }) => (
            <SiteNavItem key={label}>
              <Link href={`${linkPrefix}${page}`}>
                <MenuLink>{label}</MenuLink>
              </Link>
            </SiteNavItem>
          ))}
          <LanguageToggle langKey={langKey} slug={slug} />
        </NavStyles>{' '}
      </SiteNavRight>
    </SiteHeader>
  )
}
