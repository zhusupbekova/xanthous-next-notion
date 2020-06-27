import Link from 'next/link'
import * as _ from 'lodash'
import styled from 'styled-components'
import { colors } from '../layouts/colors'
import { textBlock } from '../../lib/notion/renderers'
import { Tag } from './tag'
import { IPost } from '../../lib/notion/getData'

const BlogPostCard: React.FC<{ post: IPost; langKey: string }> = ({
  post,
  langKey,
}) => {
  const tags =
    post.Tags && post.Tags.length >= 1 ? post.Tags.split(',').flat() : []

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
        <TagList>
          {' '}
          {tags.map(tag => (
            <Tag name={tag}>{tag}</Tag>
          ))}
        </TagList>

        <Link href={`/${langKey}/blog/${post.Slug}`}>
          <a>
            <PostCardTitle>{post.Page}</PostCardTitle>
            <PostCardPreview>
              {(!post.preview || post.preview.length === 0) && null}
              {(post.preview || []).map((block, idx) =>
                textBlock(block, true, `${post.Slug}${idx}`)
              )}
            </PostCardPreview>
          </a>
        </Link>
      </PostCardContent>
    </PostCardWrapper>
  )
}

export default BlogPostCard

const PostCardWrapper = styled.article`
  /* flex: 1 0 30%; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 30px;
  max-height: 360px;
  background: #f6f6f6 center center;
  background-size: cover;
  transition: all 0.5s ease;

  width: calc(100% * (1 / 3) - 60px - 1px);

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

const PostCardTitle = styled.h4`
  font-size: 20px;
  line-height: 24px;
  padding: 10px;
  margin: 0;
`

const PostCardPreview = styled.p`
  font-size: 14px;
  line-height: 17px;
  padding: 10px;
`
const TagList = styled.div`
  display: flex;
  padding: 0 10px;
`
