import React from 'react'
import Header from '../../components/layouts/header'
import { useRouter } from 'next/router'
import { MainWrapper } from '../../components/layouts/globalStyles'

import Intro from '../../components/home/intro'
import OurClients from '../../components/home/clients'
import WeAre from '../../components/home/weAre'
import ProjectHightlights from '../../components/home/projects'
import Blog from '../../components/home/blog'
import Testimonials from '../../components/home/testimonials'

import { getPosts, getProjects } from '../../lib/notion/getData'

export default ({ posts, projects }) => {
  const router = useRouter()
  const { lang } = router.query

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

export async function getStaticProps({ params, preview }) {
  const posts = await getPosts(params.lang)
  const projects = await getProjects(params.lang)

  return {
    props: {
      preview: preview || false,
      posts,
      projects,
    },
    unstable_revalidate: 10,
  }
}
