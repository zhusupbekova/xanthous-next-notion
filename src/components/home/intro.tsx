import styled from 'styled-components'

import { Section } from '../layouts/globalStyles'
import { colors } from '../layouts/colors'
import { Button } from '../styled-components/button'
import t from '../../data/i18n'
import bg from '../../data/img/bg_splash.png'
import { LinkTo } from '../../lib/linkTo'

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
        <Text>
          <p>{t['general.splash.intro-text']()}</p>
        </Text>
        <LinkTo address="/contact">
          <Button>{t['general.splash.lets-chat']()}</Button>
        </LinkTo>
      </ImgWrapper>
    </Section>
  )
}

export default Intro

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 560px;
  background-size: 650px;
  background-repeat: no-repeat;
  background-position: right;
  position: relative;
  background-image: url(${bg});
  padding: 0 20px;
`

const Quote = styled.div`
  position: absolute;
  width: 133px;
  height: 154px;
  top: -65px;
  left: -20px;
  font-family: Saira;
  font-weight: 500;
  font-size: 300px;
  line-height: 300px;
  color: ${colors.quotegray};
`

const Title = styled.div`
  font-family: Saira;
  letter-spacing: 1px;
  color: black;
  font-size: 66px;
  line-height: 84px;
  margin-bottom: 0;
  z-index: 1;
  @media (max-width: 1200px) {
    font-size: 48px;
    line-height: 72px;
  }
`

const Text = styled.div`
  width: 55%;
  /* height: 96px; */
  font-family: Sarala, sans-serif;
  font-size: 26px;
  line-height: 42px;
  letter-spacing: 0.8px;

  @media (max-width: 1055px) {
    font-size: 20px;
    line-height: 30px;
  }
`
