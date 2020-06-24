import Link from 'next/link'
import Header from '../../../components/layouts/header'

import blogStyles from '../../../styles/blog.module.css'
import sharedStyles from '../../../styles/shared.module.css'

import {
  getBlogLink,
  getDateStr,
  postIsPublished,
} from '../../../lib/blog-helpers'
import { textBlock } from '../../../lib/notion/renderers'
import getNotionUsers from '../../../lib/notion/getNotionUsers'
import getBlogIndex from '../../../lib/notion/getBlogIndex'
import { useRouter } from 'next/router'
import { BLOG_INDEX_ID } from '../../../lib/notion/server-constants'
import { getPosts } from '../../../lib/notion/getData'

export default ({ posts = [], preview }) => {
  const router = useRouter()
  const { lang } = router.query

  return (
    <>
      <Header titlePre="Blog" langKey={lang} slug="/blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>My Notion Blog</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map(post => (
          <div className={blogStyles.postPreview} key={post.Slug}>
            <h3>
              <Link
                href="/[lang]/blog/[slug]"
                as={getBlogLink(post.Slug, 'blog', lang as string)}
              >
                <div className={blogStyles.titleContainer}>
                  {!post.Published && (
                    <span className={blogStyles.draftBadge}>Draft</span>
                  )}
                  <a>{post.Page}</a>
                </div>
              </Link>
            </h3>
            {post.Authors.length > 0 && (
              <div className="authors">By: {post.Authors.join(' ')}</div>
            )}
            {post.Date && (
              <div className="posted">Posted: {getDateStr(post.Date)}</div>
            )}
            <p>
              {(!post.preview || post.preview.length === 0) &&
                'No preview available'}
              {(post.preview || []).map((block, idx) =>
                textBlock(block, true, `${post.Slug}${idx}`)
              )}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

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
