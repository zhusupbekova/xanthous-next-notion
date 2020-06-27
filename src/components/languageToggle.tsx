import React from 'react'
import styled from 'styled-components'
import DoubleArrow from '../components/svgs/doubleArrow'
import { LinkTo } from '../lib/linkTo'

const Wrapper = styled.div`
  display: block;
  color: #fff;
  border-radius: 10px;
  opacity: 0.8;
  font-family: Saira;
  font-weight: normal;
  font-size: 16px;

  :hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }
`

export interface LanguageToggleProps {
  langKey: string
  slug?: string
}

const LanguageToggle: React.FunctionComponent<LanguageToggleProps> = props => {
  return (
    <LinkTo
      address={`/${props.langKey === 'en' ? 'zh' : 'en'}${props.slug || ''}`}
    >
      <Wrapper>
        {props.langKey === 'en' ? '中文' : 'English'}
        <DoubleArrow />
      </Wrapper>
    </LinkTo>
  )
}

export default LanguageToggle
