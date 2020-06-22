import React from 'react'
import Header from '../../components/layouts/header'
import { useRouter } from 'next/router'
import { MainWrapper } from '../../components/layouts/globalStyles'

import getBlogIndex from '../../lib/notion/getBlogIndex'
import {
  BLOG_INDEX_ID,
  PROJECT_INDEX_ID,
} from '../../lib/notion/server-constants'
import { postIsPublished } from '../../lib/blog-helpers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getNotionTeamMembers from '../../lib/notion/getNotionTeamMembers'

import Intro from '../../components/home/intro'
import OurClients from '../../components/home/clients'
import WeAre from '../../components/home/weAre'
import ProjectHightlights from '../../components/home/projects'
import Blog from '../../components/home/blog'
import Testimonials from '../../components/home/testimonials'

export default ({ posts, projects }) => {
  const router = useRouter()
  const { lang } = router.query
  console.log(lang, 'aaaaaaaaaaa')
  return (
    <>
      <Header titlePre="Home" langKey={lang as string} slug="" />
      <MainWrapper>
        <Intro />
        <OurClients />
        <WeAre />
        <ProjectHightlights projects={projects} langKey={lang as string} />
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
  //BLOG POSTS

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

  //PROJECTS

  const projectsTable = await getBlogIndex(PROJECT_INDEX_ID)

  const teamMembersToGet: Set<string> = new Set()
  const projects: any[] = Object.keys(projectsTable)
    .map(slug => {
      const project = projectsTable[slug]
      // remove draft projects in production
      if (!preview && !postIsPublished(project)) {
        return null
      }
      project.Authors = project.Authors || []
      for (const author of project.Authors) {
        teamMembersToGet.add(author)
      }
      return project
    })
    .filter(Boolean)

  const { teamMembers } = await getNotionTeamMembers([...teamMembersToGet])

  projects.map(project => {
    project.Authors = project.Authors.map(id => teamMembers[id].full_name)
  })

  console.log(projects)

  return {
    props: {
      preview: preview || false,
      posts,
      projects,
    },
    unstable_revalidate: 10,
  }
}
