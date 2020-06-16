import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { colors } from './colors'
import config from '../../data/config/website-config'
import Facebook from '../svgs/social/facebook'
import Twitter from '../svgs/social/twitter'
import Medium from '../svgs/social/medium'
import GitHub from '../svgs/social/github'
import RSS from '../svgs/social/rss'

const SiteFooter = styled.footer`
  position: relative;
  color: ${colors.midgrey};
  font-size: 1.3rem;
  background: ${colors.backgroundgray};
  margin: auto;
  a {
    color: #474747;
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`

const Wrapper = styled.div`
  max-width: 1350px;
  margin: auto;
  padding: 43px 30px;
  display: flex;
  justify-content: space-between;
  align-content: center;
`

const SiteFooterNav = styled.nav`
  display: flex;

  a {
    position: relative;
    margin-left: 20px;
  }

  a:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type:before {
    display: none;
  }
  @media (max-width: 650px) {
    a:first-child {
      margin-left: 0;
    }
  }

  .copyright {
    text-decoration: none;
  }
`

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`

const Footer: React.FunctionComponent = () => {
  return (
    <SiteFooter>
      <Wrapper>
        <section>
          <Link href="/">{config.title}</Link> &copy; {new Date().getFullYear()}
        </section>
        <SiteFooterNav>
          <SocialLinks>
            <SocialLinkItem
              path={config.facebook}
              title="Facebook"
              svg={<Facebook />}
            />
            <SocialLinkItem
              path={config.twitter}
              title="Twitter"
              svg={<Twitter />}
            />
            <SocialLinkItem
              path={config.medium}
              title="Medium"
              svg={<Medium />}
            />
            <SocialLinkItem
              path={config.github}
              title="GitHub"
              svg={<GitHub />}
            />
            <SocialLinkItem path={config.rss} title="RSS" svg={<RSS />} />
          </SocialLinks>
        </SiteFooterNav>
      </Wrapper>
    </SiteFooter>
  )
}

export default Footer

export const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  color: #474747;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.8rem;
    fill: #fff;
  }
`

const SocialLinkItem: React.FC<{
  path: string | undefined
  title: string
  svg: React.ReactElement<any>
}> = ({ path, title, svg }) => {
  return path ? (
    <SocialLink
      href={path}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {svg}
    </SocialLink>
  ) : null
}
