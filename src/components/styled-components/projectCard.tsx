import styled from 'styled-components'
import Link from 'next/link'
import _ from 'lodash'

import { colors } from '../layouts/colors'
import { techStackData } from '../../data/texts'
import { IProject } from '../../lib/notion/getData'
import { LinkTo } from '../../lib/linkTo'

const ProjectCard: React.FC<{ project: IProject; lang: string }> = ({
  project,
  lang,
}) => {
  const projectTechStack = project.TechStack.split(',')

  const currTechStack = projectTechStack.map(tech =>
    techStackData.map(matchedStack =>
      matchedStack.id === tech ? (
        <TechListItem key={matchedStack.id}>
          <LinkTo
            address={`/${lang}/about/${matchedStack.id}`}
            className="staticAvatar"
          >
            <TechImage src={matchedStack.logo} alt={matchedStack.id} />
          </LinkTo>
        </TechListItem>
      ) : null
    )
  )

  return (
    <Card>
      <ProjectCardImage
        alt={`${project.Page} cover image`}
        src={project.Image}
      />
      <ProjectCardContent className="post-card-content">
        <TechList>{_.flatten(currTechStack)}</TechList>
        <LinkTo
          address={`/${lang}/projects/${project.Slug}`}
          className="card-link"
        >
          <ProjectCardTitle>{project.Page}</ProjectCardTitle>
          <ProjectCardDescription>{project.Description}</ProjectCardDescription>
        </LinkTo>
      </ProjectCardContent>
    </Card>
  )
}

export default ProjectCard

const Card = styled.article`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 40px;
  height: 222px;
  width: 242px;
  background: #f8f8f8;
  background-size: cover;
  /* box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px,
    rgba(39, 44, 49, 0.03) 1px 3px 8px;
  transition: all 0.5s ease; */

  :hover {
    box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px,
      rgba(39, 44, 49, 0.04) 1px 6px 12px;
    transition: all 0.4s ease;
    transform: translate3D(0, -1px, 0) scale(1.02);
  }

  .card-link :hover {
    text-decoration: none;
  }
`

const ProjectCardImage = styled.img`
  width: 100%;
  height: 120px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
`
const ProjectCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  background-color: ${colors.backgroundgray};
  height: 105px;
`

const TechList = styled.ul`
  display: flex;
  position: relative;
  top: -13px;
  padding: 0;
  margin: 0;
  justify-content: flex-end;
  list-style: none;
`

const TechListItem = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  /* 
  :nth-child(1) {
    z-index: 10;
  }
  :nth-child(2) {
    z-index: 9;
  }
  :nth-child(3) {
    z-index: 8;
  }
  :nth-child(4) {
    z-index: 7;
  }
  :nth-child(5) {
    z-index: 6;
  }
  :nth-child(6) {
    z-index: 5;
  }
  :nth-child(7) {
    z-index: 4;
  }
  :nth-child(8) {
    z-index: 3;
  }
  :nth-child(9) {
    z-index: 2;
  }
  :nth-child(10) {
    z-index: 1;
  } */
  :hover {
    transform: translateY(0px);
  }

  .staticAvatar {
    display: block;
    overflow: hidden;
    margin: 0 0px;
    width: 26px;
    height: 26px;
    margin: 0 2px;
    border: 1px solid white;
    background-color: white;
    border-radius: 100%;
  }
`

// const StaticAvatar = styled.a`
//   display: block;
//   overflow: hidden;
//   margin: 0 0px;
//   width: 26px;
//   height: 26px;
//   margin: 0 2px;
//   border: 1px solid white;
//   background-color: white;
//   border-radius: 100%;
// `

const TechImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
`
const ProjectCardTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 5px;
  color: black;

  :hover {
    text-decoration: none;
  }
`
const ProjectCardDescription = styled.p`
  font-size: 14px;
  line-height: 17px;
  color: #828282;
`
