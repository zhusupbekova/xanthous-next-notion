import Link from 'next/link'
import Header from '../../../components/layouts/header'
import { MainWrapper } from '../../../components/layouts/globalStyles'

import blogStyles from '../../../styles/blog.module.css'
import sharedStyles from '../../../styles/shared.module.css'

import { getBlogLink, getDateStr } from '../../../lib/blog-helpers'
import { textBlock } from '../../../lib/notion/renderers'

import { useRouter } from 'next/router'
import { getPosts, IPost } from '../../../lib/notion/getData'
import styled from 'styled-components'
import { authorsData } from '../../../data/texts'
import BlogPostCard from '../../../components/styled-components/blogPostCard'
import { LinkTo } from '../../../lib/linkTo'

const Blog: React.FC<{ posts: IPost[]; preview: any }> = ({
  posts = [],
  preview,
}) => {
  const router = useRouter()
  const { lang } = router.query

  const featured = posts.filter(post => (post.Featured ? post : null)).pop()
  const rest = posts.filter(post => !post.Featured)

  return (
    <>
      <Header titlePre="Blog" langKey={lang} slug="/blog" />
      <MainWrapper>
        <Banner>
          <ImageWrapper>
            <LinkTo
              address={getBlogLink(lang as string, 'blog', featured.Slug)}
            >
              <img src={featured.Image} alt={featured.Page} />
            </LinkTo>
          </ImageWrapper>

          <FeaturedContainer>
            <LinkTo
              address={getBlogLink(lang as string, 'blog', featured.Slug)}
            >
              <FeaturedTitle>{featured.Page}</FeaturedTitle>
              <FeaturedPreview>
                {(!featured.preview || featured.preview.length === 0) && null}
                {(featured.preview || []).map((block, idx) =>
                  textBlock(block, true, `${featured.Slug}${idx}`)
                )}
              </FeaturedPreview>
            </LinkTo>
            {authorsData.map(author =>
              author.name === featured.Authors.join(' ') ? (
                <FeaturedAuthor key={author.id}>
                  <AuthorImage src={author.avatar} alt={author.id} />
                  <Author>
                    //TODO link to author profile
                    <LinkTo address="/">{author.name}</LinkTo>
                    <p>{featured.ReadTime}</p>
                  </Author>
                </FeaturedAuthor>
              ) : null
            )}
          </FeaturedContainer>
        </Banner>
        <BlogGrid>
          {rest.map(post => (
            <BlogPostCard
              key={post.Slug}
              post={post}
              langKey={lang as string}
            />
          ))}
        </BlogGrid>
      </MainWrapper>
    </>
  )
}

export default Blog

export async function getStaticPaths() {
  return {
    paths: [
      { params: { lang: 'en' } },
      { params: { lang: 'zh' } }, // See the "paths" section below
    ],
    fallback: false, // See the "fallback" section below
  }
}

export async function getStaticProps({ params, preview }) {
  const posts = await getPosts(params.lang)
  return {
    props: {
      preview: preview || false,
      posts,
    },
    unstable_revalidate: 10,
  }
}

const Banner = styled.div`
  display: flex;
  padding: 30px;
`
const ImageWrapper = styled.div`
  background: no-repeat center center;
  background-size: cover;
  flex: 1;
`

const FeaturedContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 60px;
  justify-content: space-between;
`

const FeaturedTitle = styled.h1`
  font-family: Sarala;
  font-size: 48px;
  line-height: 48px;
  color: black;
`

const FeaturedPreview = styled.p`
  font-family: Sarala;
  font-size: 26px;
  line-height: 39px;
`

const FeaturedAuthor = styled.div`
  display: flex;
  flex-direction: row;
`
const AuthorImage = styled.img`
  object-fit: cover;
  margin-right: 15px;
  width: 60px;
  height: 60px;
  background: rgb(228, 234, 237);
  border-radius: 100%;
`

const Author = styled.div`
  display: flex;
  flex-direction: column;
`
const BlogGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: flex-start; */
  padding: 30px 0;
`

// {preview && (
//   <div className={blogStyles.previewAlertContainer}>
//     <div className={blogStyles.previewAlert}>
//       <b>Note:</b>
//       {` `}Viewing in preview mode{' '}
//       <Link href={`/api/clear-preview`}>
//         <button className={blogStyles.escapePreview}>
//           Exit Preview
//         </button>
//       </Link>
//     </div>
//   </div>
// )}
// <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
//   <h1>My Notion Blog</h1>
//   {posts.length === 0 && (
//     <p className={blogStyles.noPosts}>There are no posts yet</p>
//   )}
//   {posts.map(post => (
//     <div className={blogStyles.postPreview} key={post.Slug}>
//       <h3>
//         <Link
//           href="/[lang]/blog/[slug]"
//           as={getBlogLink(lang as string, 'blog', post.Slug)}
//         >
//           <div className={blogStyles.titleContainer}>
//             {!post.Published && (
//               <span className={blogStyles.draftBadge}>Draft</span>
//             )}
//             <a>{post.Page}</a>
//           </div>
//         </Link>
//       </h3>
//       {post.Authors.length > 0 && (
//         <div className="authors">By: {post.Authors.join(' ')}</div>
//       )}
//       {post.Date && (
//         <div className="posted">Posted: {getDateStr(post.Date)}</div>
//       )}
//       <p>
//         {(!post.preview || post.preview.length === 0) &&
//           'No preview available'}
//         {(post.preview || []).map((block, idx) =>
//           textBlock(block, true, `${post.Slug}${idx}`)
//         )}
//       </p>
//     </div>
//   ))}
// </div>
