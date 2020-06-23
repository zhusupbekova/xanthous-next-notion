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
import { PROJECT_INDEX_ID } from '../../../lib/notion/server-constants'

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
  const projectsTable = await getBlogIndex(PROJECT_INDEX_ID)

  // console.log(projectsTable)

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

  return {
    props: {
      preview: preview || false,
      projects,
    },
    unstable_revalidate: 10,
  }
}

export default ({ projects = [], preview }) => {
  const router = useRouter()
  const { lang } = router.query

  const filteredProjects = projects.filter(project =>
    project.Language === lang ? project : null
  )

  return (
    <>
      <Header titlePre="Projects" langKey={lang} slug="/projects" />
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
        {filteredProjects.length === 0 && (
          <p className={blogStyles.noposts}>There are no projects yet</p>
        )}
        {filteredProjects.map(project => {
          return (
            <div className={blogStyles.projectPreview} key={project.Slug}>
              <h3>
                <Link
                  href="/[lang]/projects/[slug]"
                  as={getBlogLink(project.Slug, 'projects', lang as string)}
                >
                  <div className={blogStyles.titleContainer}>
                    {!project.Published && (
                      <span className={blogStyles.draftBadge}>Draft</span>
                    )}
                    <a>{project.Page}</a>
                  </div>
                </Link>
              </h3>
              {project.Authors.length > 0 && (
                <div className="authors">By: {project.Authors.join(' ')}</div>
              )}
              {project.Date && (
                <div className="posted">Posted: {getDateStr(project.Date)}</div>
              )}
              <p>
                {(!project.preview || project.preview.length === 0) &&
                  'No preview available'}
                {(project.preview || []).map((block, idx) =>
                  textBlock(block, true, `${project.Slug}${idx}`)
                )}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}
