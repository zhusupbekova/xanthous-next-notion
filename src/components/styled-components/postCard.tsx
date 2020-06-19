import Link from 'next/link'
import * as _ from 'lodash'
import styled from 'styled-components'

import { colors } from '../layouts/colors'

const PostCardWrapper = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 10px 40px;
  max-height: 420px;
  background: #f6f6f6 center center;
  background-size: cover;
  transition: all 0.5s ease;
  padding: 16px;

  :hover {
    transition: all 0.4s ease;
    transform: translate3D(0, -1px, 0) scale(1.02);
  }

  @media (max-width: 1355px) {
    :nth-child(3) {
      display: none;
    }
  }
  @media (max-width: 1110px) {
    :nth-child(3) {
      display: flex;
    }
  }
  @media (max-width: 880px) {
    :nth-child(3) {
      display: none;
    }
  }
`

const PostCardImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
`

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 16px;
  color: ${colors.darkgrey};

  a {
    color: black;
  }
  a:hover {
    text-decoration: none;
  }
`

const PostCardContentLink = styled.div`
  position: relative;
  flex-grow: 1;
  display: block;
  padding: 10px 16px;
  color: ${colors.darkgrey};

  :hover {
    text-decoration: none;
  }
`

const PostCardTitle = styled.h2`
  margin-top: 0;
  font-weight: bold;
  font-size: 30px;
  line-height: 44px;
`

const PostCard = ({ post, langKey }) => {
  console.log(post, post.Image)
  return (
    <PostCardWrapper>
      <Link href={`/${langKey}/blog/${post.Slug}`}>
        <a>
          <PostCardImage>
            <img
              alt={`${post.Page} cover image`}
              style={{ height: '100%', width: '100%' }}
              src={post.Image} //Image src should be embedded, not uploaded
            />
          </PostCardImage>
        </a>
      </Link>

      <PostCardContent>
        <Link href={`/${langKey}/blog/${post.Slug}`}>
          <a>
            <PostCardTitle>{post.Page}</PostCardTitle>
          </a>
        </Link>
      </PostCardContent>
    </PostCardWrapper>
  )
}

export default PostCard
