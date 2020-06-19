import React from 'react'

import Link from 'next/link'
import Header from '../../components/layouts/header'
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
import Testimonials from '../../components/home/testimonials'

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
        <Testimonials />
        <Blog posts={posts} langKey={lang as string} />
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
