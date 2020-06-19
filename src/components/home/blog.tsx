import styled from 'styled-components'
import { colors } from '../layouts/colors'
import { Section } from '../layouts/globalStyles'
import Arrow from '../svgs/arrow'
import PostCard from '../styled-components/postCard'

const Blog = ({ posts = [], langKey }) => {
  console.log('posts', posts)
  return (
    <Section>
      <PostFeedContainer>
        <PostFeedTitle>
          <Title>Get more out of Xanthous</Title>
        </PostFeedTitle>
        <PostsContainer>
          {posts.slice(0, 3).map(post => {
            return <PostCard key={post.Slug} post={post} langKey={langKey} />
          })}
          <TitleContainer>
            <Title>Get more out of Xanthous</Title>
            <a href="/blog" className="getMore_link">
              LEARN MORE
              <div className="arrow">
                <Arrow />
              </div>
            </a>
          </TitleContainer>
        </PostsContainer>
        <PostFeedLink>
          <a href="/blog" className="getMore_link">
            LEARN MORE
            {/* <ArrowContainer> */}
            <Arrow />
            {/* </ArrowContainer> */}
          </a>
        </PostFeedLink>
      </PostFeedContainer>
    </Section>
  )
}

export default Blog

const PostFeedContainer = styled.div`
  align-content: center;
  padding: 60px 0;

  .getMore_link {
    align-self: flex-end;
    font-size: 30px;
    line-height: 44px;
    color: #474747;
    font-weight: bold;
  }

  @media (max-width: 1110px) {
    .getMore_link {
      position: absolute;
      right: 10px;
      font-size: 20px;
      line-height: 30px;
      font-weight: bold;
    }
  }
`

const PostsContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-family: Saira;
  text-align: right;
  color: black;
  /* @media (max-width: 1440px) {
    text-align: center;
  } */
`

const PostFeedLink = styled.div`
  display: none;
  @media (max-width: 1110px) {
    display: flex;
  }
`
const PostFeedTitle = styled.div`
  max-width: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: none;
  @media (max-width: 1110px) {
    display: flex;
  }
`
const TitleContainer = styled.div`
  max-width: 300px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 410px;

  @media (max-width: 1110px) {
    display: none;
  }
`
const ArrowContainer = styled.div`
  display: inline-block;
  margin-left: 30px;
  height: 45px;

  @media (max-width: 1110px) {
    display: inline-block;
    margin-left: 20px;
    height: 40px;
  }
`
