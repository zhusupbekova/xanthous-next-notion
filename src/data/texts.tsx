import t from './i18n'

export const testimonialsData = [
  {
    id: 'amzKungfu',
    name: t['testimonials.amzkungfu.name'](),
    title: t['testimonials.amzkungfu.title'](),
    image: require('./clients/amz.svg'),
    testimonialTitle: t['testimonials.amzkungfu.testimonialTitle'](),
    testimonialContent: t['testimonials.amzkungfu.testimonialContent'](),
  },
  {
    id: 'koch',
    name: t['testimonials.koch.name'](),
    title: t['testimonials.koch.name'](),
    image: require('./clients/koch.svg'),
    testimonialTitle: t['testimonials.koch.testimonialTitle'](),
    testimonialContent: t['testimonials.koch.testimonialContent'](),
  },
  {
    id: 'amz',
    name: t['testimonials.amz.name'](),
    title: t['testimonials.amz.title'](),
    image: require('./clients/amz.svg'),
    testimonialTitle: t['testimonials.amz.testimonialTitle'](),
    testimonialContent: t['testimonials.amz.testimonialContent'](),
  },
  {
    id: 'initialView',
    name: t['testimonials.initialView.name'](),
    title: t['testimonials.initialView.title'](),
    image: require('./clients/initialView.svg'),
    testimonialTitle: t['testimonials.initialView.testimonialTitle'](),
    testimonialContent: t['testimonials.initialView.testimonialContent'](),
  },
]

export const techStackData = [
  {
    id: 'react',
    name: 'React',
    website: 'https://reactjs.org',
    desc: 'techstack.react.desc',
    logo: require('./img/react.png'),
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    website: 'https://graphql.org',
    desc: 'techstack.graphql.desc',
    logo: require('./img/graphql.png'),
  },
  {
    id: 'apollo',
    name: 'Apollo GraphQL',
    website: 'https://www.apollographql.com/',
    desc: 'techstack.apollo.desc',
    logo: require('./img/apollo-graphql.png'),
  },
  {
    id: 'styled-components',
    name: 'Styled Components',
    website: 'https://www.styled-components.com/',
    desc: 'techstack.styled-components.desc',
    logo: require('./img/styled-components.png'),
  },
  {
    id: 'loopback',
    name: 'LoopBack',
    website: 'https://loopback.io/',
    desc: 'techstack.loopback.desc',
    logo: require('./img/loopback.png'),
  },
  {
    id: 'lombok',
    name: 'Project Lombok',
    website: 'https://projectlombok.org/',
    desc: 'techstack.lombok.desc',
    logo: require('./img/lombok.png'),
  },
  {
    id: 'typeorm',
    name: 'TypeORM',
    website: 'http://typeorm.io/#/',
    desc: 'techstack.typeorm.desc',
    logo: require('./img/typeorm.png'),
  },
  {
    id: 'grpc',
    name: 'gRPC',
    website: 'https://grpc.io',
    desc: 'techstack.grpc.desc',
    logo: require('./img/grpc.png'),
  },
  {
    id: 'aws',
    name: 'AWS',
    website: 'https://aws.amazon.com',
    desc: 'techstack.aws.desc',
    logo: require('./img/aws.png'),
  },
  {
    id: 'aws-lambda',
    name: 'AWS Lambda',
    website: 'https://aws.amazon.com/lambda/',
    desc: 'techstack.aws-lambda.desc',
    logo: require('./img/lambda.png'),
  },
  {
    id: 'aws-appsync',
    name: 'AWS AppSync',
    website: 'https://aws.amazon.com/appsync/',
    desc: 'techstack.aws-appsync.desc',
    logo: require('./img/xanthous.png'),
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    website: 'http://spring.io/projects/spring-boot',
    desc: 'techstack.spring-boot.desc',
    logo: require('./img/spring-boot.png'),
  },
  {
    id: 'reactor',
    name: 'Reactor',
    website: 'https://projectreactor.io/',
    desc: 'techstack.reactor.desc',
    logo: require('./img/reactor.png'),
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    website: 'https://www.elastic.co/products/elasticsearch',
    desc: 'techstack.elasticsearch.desc',
    logo: require('./img/elastic-search.png'),
  },
]

export const weAre = [
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
