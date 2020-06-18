import React from 'react'
import Link from 'next/link'
import Header from '../../components/layouts/header'
import ExtLink from '../../components/ext-link'
import Features from '../../components/features'
import GitHub from '../../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'
import Intro from '../../components/home/intro'
import { useRouter } from 'next/router'
import { MainWrapper } from '../../components/layouts/globalStyles'
import OurClients from '../../components/home/clients'
import WeAre from '../../components/home/weAre'
import ProjectHightlights from '../../components/home/projects'
import Blog from '../../components/home/blog'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { BLOG_INDEX_ID } from '../../lib/notion/server-constants'
import { postIsPublished } from '../../lib/blog-helpers'
import getNotionUsers from '../../lib/notion/getNotionUsers'

export default ({ posts }) => {
  const router = useRouter()
  const { lang } = router.query
  return (
    <>
      <Header titlePre="Home" langKey={lang as string} slug="" />
      <MainWrapper>
        <Intro />
        <OurClients />
        <WeAre />
        <ProjectHightlights />
        <Blog posts={posts} langKey={lang as string} />
        {/* <img
          src="/zeit-and-notion.png"
          height="85"
          width="250"
          alt="Vercel + Notion"
        />
        <h1>My Notion Blog</h1>
        <h2>
          Blazing Fast Notion Blog with Next.js'{' '}
          <ExtLink
            href="https://github.com/zeit/next.js/issues/9524"
            className="dotted"
            style={{ color: 'inherit' }}
          >
            SSG
          </ExtLink>
        </h2> */}

        {/* <Features />

        <div className="explanation">
          <p>
            This is a statically generated{' '}
            <ExtLink href="https://nextjs.org">Next.js</ExtLink> site with a{' '}
            <ExtLink href="https://notion.so">Notion</ExtLink> powered blog that
            is deployed with <ExtLink href="https://vercel.com">Vercel</ExtLink>
            . It leverages some upcoming features in Next.js like{' '}
            <ExtLink href="https://github.com/zeit/next.js/issues/9524">
              SSG support
            </ExtLink>{' '}
            and{' '}
            <ExtLink href="https://github.com/zeit/next.js/issues/8626">
              built-in CSS support
            </ExtLink>{' '}
            which allow us to achieve all of the benefits listed above including
            blazing fast speeds, great local editing experience, and always
            being available!
          </p>

          <p>
            Get started by creating a new page in Notion and clicking the deploy
            button below. After you supply your token and the blog index id (the
            page's id in Notion) we will automatically create the table for you!
            See{' '}
            <ExtLink href="https://github.com/ijjk/notion-blog#getting-blog-index-and-token">
              here in the readme
            </ExtLink>{' '}
            for finding the new page's id. To get your token from Notion, login
            and look for a cookie under www.notion.so with the name `token_v2`.
            After finding your token and your blog's page id you should be good
            to go!
          </p>
        </div> */}
      </MainWrapper>
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

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex(BLOG_INDEX_ID)

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name)
  })

  console.log(posts)

  return {
    props: {
      preview: preview || false,
      posts,
    },
    unstable_revalidate: 10,
  }
}