import getBlogIndex from './getBlogIndex'
import {
  BLOG_INDEX_ID,
  ZH_BLOG_INDEX_ID,
  PROJECT_INDEX_ID,
  ZH_PROJECT_INDEX_ID,
} from './server-constants'
import preview from '../../pages/api/preview'
import { postIsPublished } from '../blog-helpers'
import getNotionUsers from './getNotionUsers'
import getPageData from './getPageData'

export interface IPost {
  id: string
  Published: string
  ReadTime: string | null
  Date: number
  Image: string
  Slug: string
  Featured: string | null
  Tags: string | null
  Authors: string[]
  Page: string
  preview: any[]
}

export const getPosts = async (lang: 'en' | 'zh'): Promise<IPost[]> => {
  const key = lang === 'en' ? BLOG_INDEX_ID : ZH_BLOG_INDEX_ID
  const postsTable = await getBlogIndex(key)

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

  return posts
}

export interface IProject {
  id: string
  Published: string
  Page: string
  Description: string
  Length: string | null
  Date: number
  Image: string
  Slug: string
  // Featured: string | null
  TechStack: string | null
  Authors: string[]
  preview: any[]
}

export const getProjects = async (lang: 'en' | 'zh'): Promise<IProject[]> => {
  const key = lang === 'en' ? PROJECT_INDEX_ID : ZH_PROJECT_INDEX_ID

  const projectsTable = await getBlogIndex(key)

  const authorsToGet: Set<string> = new Set()
  const projects: any[] = Object.keys(projectsTable)
    .map(slug => {
      const project = projectsTable[slug]
      // remove draft projects in production
      if (!preview && !postIsPublished(project)) {
        return null
      }
      project.Authors = project.Authors || []
      for (const author of project.Authors) {
        authorsToGet.add(author)
      }

      return project
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  projects.map(project => {
    project.Authors = project.Authors.map(id => users[id].full_name)
  })

  return projects
}

export const getPost = async (
  lang: 'en' | 'zh',
  slug: string
): Promise<IPost> => {
  const key = lang === 'en' ? BLOG_INDEX_ID : ZH_BLOG_INDEX_ID
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex(key)

  const post = postsTable[slug]

  const postData = await getPageData(post.id)
  post.content = postData.blocks

  for (let i = 0; i < postData.blocks.length; i++) {
    const { value } = postData.blocks[i]
    const { type, properties } = value
    if (type == 'tweet') {
      const src = properties.source[0][0]
      // parse id from https://twitter.com/_ijjk/status/TWEET_ID format
      const tweetId = src.split('/')[5].split('?')[0]
      if (!tweetId) continue

      try {
        const res = await fetch(
          `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
        )
        const json = await res.json()
        properties.html = json.html.split('<script')[0]
        post.hasTweet = true
      } catch (_) {
        console.log(`Failed to get tweet embed for ${src}`)
      }
    }
  }

  const { users } = await getNotionUsers(post.Authors || [])
  post.Authors = Object.keys(users).map(id => users[id].full_name)

  return post
}

export const getProject = async (
  lang: 'en' | 'zh',
  slug: string
): Promise<IProject> => {
  const key = lang === 'en' ? PROJECT_INDEX_ID : ZH_PROJECT_INDEX_ID
  // load the postsTable so that we can get the page's ID
  const projectsTable = await getBlogIndex(key)

  const project = projectsTable[slug]

  const projectData = await getPageData(project.id)
  project.content = projectData.blocks

  for (let i = 0; i < projectData.blocks.length; i++) {
    const { value } = projectData.blocks[i]
    const { type, properties } = value
    if (type == 'tweet') {
      const src = properties.source[0][0]
      // parse id from https://twitter.com/_ijjk/status/TWEET_ID format
      const tweetId = src.split('/')[5].split('?')[0]
      if (!tweetId) continue

      try {
        const res = await fetch(
          `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
        )
        const json = await res.json()
        properties.html = json.html.split('<script')[0]
        project.hasTweet = true
      } catch (_) {
        console.log(`Failed to get tweet embed for ${src}`)
      }
    }
  }

  const { users } = await getNotionUsers(project.Authors || [])
  project.Authors = Object.keys(users).map(id => users[id].full_name)

  return project
}
