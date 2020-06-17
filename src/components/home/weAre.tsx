import { useIntl } from 'react-intl'
import styled from 'styled-components'
import Card from '../styled-components/card'

const StyledDiv = styled.section`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 70px;
  overflow: hidden;
`

// const renderAsk = (data: any, f: any): React.ReactNode => {
//   const sourceData = data.allIntroYaml.edges;

//   return (
//     <StyledDiv>
//       {sourceData.map((d: any) => (
//         <CardComponent text={f({ id: d.node.content })} />
//       ))}
//     </StyledDiv>
//   );
// };
