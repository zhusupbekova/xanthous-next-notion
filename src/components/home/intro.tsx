import Link from 'next/link'
import styled from 'styled-components'

import { Section } from '../layouts/globalStyles'
import { colors } from '../layouts/colors'
import { Button } from '../styled-components/button'
import t from '../../data/i18n'
import bg from '../../data/img/bg_splash.png'

const Intro = () => {
  return (
    <Section>
      <ImgWrapper>
        <Quote>“</Quote>
        <Title>
          <h1>
            {t['general.splash.title1']()}
            <br />
            {t['general.splash.title2']()}
          </h1>
        </Title>
        <Text>{t['general.splash.intro-text']()}</Text>
        <ButtonWrapper>
          <Link href="/contact">
            <Button>{t['general.splash.lets-chat']()}</Button>
          </Link>
        </ButtonWrapper>
      </ImgWrapper>
    </Section>
  )
}

export default Intro

const ImgWrapper = styled.div`
  min-height: 560px;
  background-size: 650px;
  background-repeat: no-repeat;
  background-position: right;
  position: relative;
  background-image: url(${bg});
`

const Quote = styled.div`
  position: relative;
  width: 133px;
  height: 154px;
  top: -50px;
  left: -20px;
  font-family: Saira;
  font-weight: 500;
  font-size: 300px;
  line-height: 300px;
  color: ${colors.quotegray};
`

const Title = styled.div`
  position: absolute;
  top: 50px;
  left: 30px;
  font-family: Saira;
  letter-spacing: 1px;
  color: black;
  font-size: 66px;
  line-height: 84px;
  margin-bottom: 0;
  position: absolute;

  @media (max-width: 1200px) {
    font-size: 48px;
    line-height: 72px;
  }
`

const Text = styled.div`
  position: absolute;
  width: 689px;
  top: 250px;
  left: 30px;
  height: 96px;
  font-family: Sarala, sans-serif;
  font-size: 26px;
  line-height: 42px;
  letter-spacing: 0.8px;
`
const ButtonWrapper = styled.div`
  position: absolute;
  top: 440px;
  left: 30px;
`
