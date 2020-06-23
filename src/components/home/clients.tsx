import styled from 'styled-components'
import { Section } from '../layouts/globalStyles'
import t from '../../data/i18n'

import koch from '../../data/clients/koch.svg'
import amz from '../../data/clients/amz.svg'
import dynamite from '../../data/clients/dynamite.svg'
import initialView from '../../data/clients/initialView.svg'
import ingclass from '../../data/clients/ingclass.svg'
import caminer from '../../data/clients/caminer.svg'

const OurClients = () => {
  return (
    <Section>
      <Wrapper>
        <Title>{t['general.ourClients']()}</Title>
        <ClientsWrapper>
          <div className="client">
            <img src={koch} />
          </div>
          <div className="client">
            <img src={initialView} />
          </div>
          <div className="client">
            <img src={amz} />
          </div>
          <div className="client">
            <img src={dynamite} />
          </div>
          <div className="client">
            <img src={ingclass} />
          </div>
          <div className="client">
            <img src={caminer} />
          </div>
        </ClientsWrapper>
      </Wrapper>
    </Section>
  )
}

export default OurClients

const Wrapper = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding: 0 130px;
  display: grid;
  @media (max-width: 800px) {
    padding: 60px 50px;
  }
  @media (max-width: 500px) {
    padding: 60px 20px;
  }
`

const Title = styled.h4`
  font-family: Saira;
  align-self: center;
  justify-self: center;
  line-height: 42px;
`
const ClientsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  .client {
    width: 16%;
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  @media (max-width: 1300px) {
    .client {
      width: 30%;
    }
  }
`
