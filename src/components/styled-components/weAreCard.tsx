import styled from 'styled-components'
import { colors } from '../layouts/colors'
import ChatIcon from '../svgs/chat'

const Card = ({ text }) => {
  const maxLength = 220
  const sentenceCutter = sentence =>
    sentence.length > maxLength
      ? sentence.substr(0, maxLength) + '...'
      : sentence
  return (
    <CardWrapper>
      <Icon>
        <ChatIcon />
      </Icon>
      <CardDescription>{sentenceCutter(text)}</CardDescription>
    </CardWrapper>
  )
}

export default Card

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  background: ${colors.backgroundgray};
  padding: 53px 20px;
  margin-top: 36px;
  width: 48%;
  max-height: 440px;
  @media (max-width: 950px) {
    flex-direction: column;
    width: 100%;
  }
`

const CardDescription = styled.div`
  font-family: Sarala;
  font-size: 26px;
  line-height: 36px;
  @media (max-width: 420px) {
    font-size: 20px;
    line-height: 30px;
  }
`

const Icon = styled.div`
  position: absolute;
  z-index: 10;
  left: 19px;
  top: -43px;
`
