import Header from '../../../components/layouts/header'
import { MainWrapper } from '../../../components/layouts/globalStyles'
import { useRouter } from 'next/router'
import _ from 'lodash'
import styled from 'styled-components'
import { techStackData } from '../../../data/texts'
import t from '../../../data/i18n'
import { Button } from '../../../components/styled-components/button'
import Link from 'next/link'
import { Component } from 'react'
import Slider from 'react-slick'
import ProjectCard from '../../../components/styled-components/projectCard'
import { IProject, getProjects } from '../../../lib/notion/getData'

const TechStack: React.FC<{ stack: any; projects: IProject[] }> = ({
  stack,
  projects,
}) => {
  const router = useRouter()
  const { lang } = router.query
  return (
    <>
      <Header
        titlePre="Tech Stack"
        langKey={lang as string}
        slug={`/about/${stack.id}`}
      />
      <MainWrapper>
        <TechStackLogo src={stack.logo} alt={stack.name} />
        <TechStackDesc>{t[`${stack.desc}`]()}</TechStackDesc>

        <h2 style={{ marginTop: '20px' }}>{t['general.caseStudies']()}</h2>
        <Responsive stack={stack} projects={projects} lang={lang as string} />
        <ContactUsWrapper>
          <ContactUsText>
            {t['general.faq.haveProject']()}
            {stack.name}?
          </ContactUsText>
          <Link href={`/${lang}/contact`}>
            <Button>{t['general.button.talkToUs']()}</Button>
          </Link>
        </ContactUsWrapper>
      </MainWrapper>
    </>
  )
}

export default TechStack

interface IResponsiveProps {
  projects: IProject[]
  stack: { id: string }
  lang: string
}

class Responsive extends Component<IResponsiveProps> {
  render() {
    const { projects, stack, lang } = this.props

    // Carousel settings
    const settings = {
      // className: `${SliderStyles}`,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <SliderWrapper>
        <Slider {...settings}>
          {projects.reduce((acc: any[], project: IProject) => {
            if (project.TechStack && project.TechStack.includes(stack.id)) {
              return acc.concat(
                <ProjectCard key={project.Slug} project={project} lang={lang} />
              )
            }
            return acc
          }, [])}
        </Slider>
      </SliderWrapper>
    )
  }
}

export async function getStaticPaths() {
  const langs = ['en', 'zh']
  const paths = techStackData.map(stack =>
    langs.map(lang => ({ params: { 'tech-stack': stack.id, lang } }))
  )

  return { paths: _.flatten(paths), fallback: false }
}

export async function getStaticProps({ params, preview }) {
  //tech-stack data
  const stack = techStackData.find(stack => params['tech-stack'] === stack.id)

  //projects data
  const projects = await getProjects(params.lang)

  return {
    props: { stack, preview: preview || false, projects },
    unstable_revalidate: 10,
  }
}

const TechStackLogo = styled.img`
  position: absolute;
  max-height: 55px;
`
const TechStackDesc = styled.p`
  margin-top: 75px;
  font-size: 2rem;
  line-height: 29px;
  letter-spacing: 0.5px;
  opacity: 0.8;
`
const ContactUsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
`

const ContactUsText = styled.div`
  font-weight: bold;
  font-size: 30px;
  line-height: 36px;
`
const SliderWrapper = styled.div`
  .slick-track {
    width: 100%;
    margin: 0;
  }
`
