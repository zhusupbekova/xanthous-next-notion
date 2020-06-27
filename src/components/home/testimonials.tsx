import styled from 'styled-components'
import Slider from 'react-slick'
import t from '../../data/i18n'
import { colors } from '../layouts/colors'

import { testimonialsData } from '../../data/texts'
import { Section } from '../layouts/globalStyles'

const Testimonials = () => {
  return (
    <Section>
      <TestimonialContainer>
        <Title>
          <h1 style={{ zIndex: 1 }}>{t['testimonials.sectionTitle']()}</h1>
          <Quote>“</Quote>
        </Title>

        <SliderContainer>
          <Slider
            className="slider__box"
            dots={true}
            infinite={true}
            //   arrows={true}
            autoplay={true}
            autoplaySpeed={5000}
          >
            {testimonialsData.map(testimonial => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </Slider>
        </SliderContainer>
      </TestimonialContainer>
    </Section>
  )
}

export default Testimonials

const TestimonialCard = props => (
  <Item>
    <Logo>
      <img src={props.image} />
    </Logo>
    <TestimonialTitle>{props.testimonialTitle}</TestimonialTitle>
    <TestimonialText>{props.testimonialContent}</TestimonialText>

    <div className="testimonials_author">
      {props.name}
      <br />
      {props.title}
    </div>
  </Item>
)

const TestimonialContainer = styled.div`
  position: relative;
  display: flex;
  padding: 60px 0;
  width: auto;
  background-color: #ffffff;
  min-height: 650px;
  flex-direction: row;
  @media (max-width: 900px) {
    padding: 60px 70px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const Title = styled.div`
  position: relative;
  display: flex;
  max-width: 350px;
  width: 100%;
  color: black;
  line-height: 84px;
  font-family: Saira;
  font-size: 66px;
  line-height: 84px;
  border: 1px dashed black;
  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    height: 130px;
    justify-content: center;
    align-items: center;
  }
`

const Quote = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  right: 30px;
  bottom: 100px;
  font-family: Saira;
  font-weight: 500;
  font-size: 300px;
  line-height: 300px;
  color: ${colors.yellow};
  transform: rotate(180deg);
  @media (max-width: 900px) {
    right: 20px;
    bottom: 0;
  }
`
const SliderContainer = styled.div`
  width: 65%;
  flex: 1;
  background-color: ${colors.backgroundgray};

  /* .slider__box:before {
    position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    width: 15px;
    background-image: linear-gradient(
      90deg,
      white 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .slider__box:after {
    position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    right: 0;
    width: 15px;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      white 100%
    );
  } */

  .slick-dots {
    text-align: end;
  }
  .slick-slide {
    padding: 0 15px;
  }

  @media (max-width: 900px) {
    width: 100%;

    .slick-dots {
      bottom: -20px;
    }
  }
`

const Item = styled.div`
  position: relative;
  margin-bottom: 20px;
  text-align: left;
  padding: 40px;
  @media (max-width: 900px) {
    padding: 40px;
  }
`

const TestimonialTitle = styled.h3`
  font-weight: bold;
  font-size: 30px;
  line-height: 36px;
  color: black;
`

const TestimonialText = styled.p`
  color: #636363;
  font-size: 20px;
  line-height: 36px;
`

const Logo = styled.div`
  float: right;
  @media (max-width: 900px) {
    padding: 0 20px;
  }
`
