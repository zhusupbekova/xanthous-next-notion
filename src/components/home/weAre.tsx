import styled from 'styled-components'
import { Section } from '../layouts/globalStyles'
import Card from '../styled-components/weAreCard'
import t from '../../data/i18n'

const WeAre = () => {
  return (
    <Section>
      <StyledDiv>
        {texts.map(text => (
          <Card key={text.id} text={text.content} />
        ))}
      </StyledDiv>
    </Section>
  )
}

export default WeAre

const texts = [
  {
    id: 'whoWeAre',
    title: t['general.intro.whoWeAre.title'](),
    content: t['general.intro.whoWeAre.content'](),
  },
  {
    id: 'whatWeDo',
    title: t['general.intro.whatWeDo.title'](),
    content: t['general.intro.whatWeDo.content'](),
  },
  {
    id: 'howWeDoIt',
    title: t['general.intro.howWeDoIt.title'](),
    content: t['general.intro.howWeDoIt.content'](),
  },
]

const StyledDiv = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 100px 0;
  overflow: hidden;
`
