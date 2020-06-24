import styled from 'styled-components'
import Link from 'next/link'
import Slider from 'react-slick'
import { Section } from '../layouts/globalStyles'
import t from '../../data/i18n'

const ProjectHightlights = ({ projects = [], langKey }) => {
  if (!projects) {
    return null
  }

  const settings = {
    className: 'slider__box',
    dots: true,
    slidesToShow: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    swipeToSlide: true,
  }
  return (
    <Section>
      <TitleContainer>
        <Title>{t['general.projects.title']()}</Title>
        <Subtitle>{t['general.projects.subtitle']()}</Subtitle>
      </TitleContainer>
      <SliderContainer>
        <Slider {...settings}>
          {projects.concat(projects).map(project => (
            <ProjectCard key={project.id} project={project} langKey={langKey} />
          ))}
        </Slider>
      </SliderContainer>
    </Section>
  )
}

export default ProjectHightlights

const ProjectCard = ({ project, langKey }) => (
  <div className="slider__item_to_bottom">
    <div className="slider__item_box">
      <div className="slider__item">
        <Link href={`/${langKey}/projects/${project.Slug}`}>
          <a>
            <img className="slider__img" src={project.Image} />
          </a>
        </Link>
      </div>
      <div className="slider__item_title">{project.Page}</div>
    </div>
  </div>
)

const TitleContainer = styled.div`
  text-align: start;
  @media (max-width: 900px) {
    text-align: center;
  }
`

const Title = styled.h1`
  font-family: Saira;
  margin-bottom: 15px;
  color: black;
`

const Subtitle = styled.p`
  font-family: Sarala;
  font-size: 26px;
  line-height: 36px;
  margin: 0;
`

const SliderContainer = styled.div`
  padding-bottom: 30px;
  .slider__box {
    padding: 0;
    margin: 0;
    width: 1570px;
    list-style: none;
    height: 450px;
  }
  .slick-list {
    box-shadow: 0 0 0 0 transparent !important;
  }

  .slider__img {
    width: 100%;
    height: 100%;
  }

  .slider__item_to_bottom {
    position: relative;
    height: 450px;
  }

  .slick-current .slider__item_box {
    left: 0;
    transform: translateX(0) scale(1.2);
  }

  .slider__item_box {
    position: absolute;
    bottom: 0;
    left: 100%;
    transform: translateX(-100%) scale(1);
    height: 350px;
    width: 450px;
    transition-property: all justify-content;
    transform-origin: bottom left;
    transition-delay: 0.1s;
    transition-duration: 0.4s;
  }
  @media (max-width: 900px) {
    .slick-current .slider__item_box {
      left: 45px;
      transform: translateX(0) scale(1.2);
    }

    .slider__item_box {
      bottom: 0;
      transition-property: all justify-content;
      transform-origin: bottom center;
    }
  }
  .slider__item {
    height: 85%;
  }
`
