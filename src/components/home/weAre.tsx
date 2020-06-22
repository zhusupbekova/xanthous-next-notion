import styled from 'styled-components'
import { Section } from '../layouts/globalStyles'
import Card from '../styled-components/weAreCard'
import { weAre } from '../../data/texts'

const WeAre = () => {
  return (
    <Section>
      <StyledDiv>
        {weAre.map(text => (
          <Card key={text.id} text={text.content} />
        ))}
      </StyledDiv>
    </Section>
  )
}

export default WeAre

const StyledDiv = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 100px 0;
  overflow: hidden;
`
