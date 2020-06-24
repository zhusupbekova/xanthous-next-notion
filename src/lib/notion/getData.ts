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
import getNotionTeamMembers from './getNotionTeamMembers'

export const getPosts = async (lang: 'en' | 'zh') => {
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

export const getProjects = async (lang: 'en' | 'zh') => {
  const key = lang === 'en' ? PROJECT_INDEX_ID : ZH_PROJECT_INDEX_ID

  const projectsTable = await getBlogIndex(key)

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

  return projects
}
