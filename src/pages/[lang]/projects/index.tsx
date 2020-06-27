import Link from 'next/link'
import Header from '../../../components/layouts/header'

import blogStyles from '../../../styles/blog.module.css'
import sharedStyles from '../../../styles/shared.module.css'

import { getBlogLink, getDateStr } from '../../../lib/blog-helpers'
import { textBlock } from '../../../lib/notion/renderers'
import { useRouter } from 'next/router'
import { getProjects } from '../../../lib/notion/getData'
import { MainWrapper } from '../../../components/layouts/globalStyles'

export default ({ projects = [], preview }) => {
  const router = useRouter()
  const { lang } = router.query

  return (
    <>
      <Header titlePre="Projects" langKey={lang} slug="/projects" />
      <MainWrapper>
        {preview && (
          <div className={blogStyles.previewAlertContainer}>
            <div className={blogStyles.previewAlert}>
              <b>Note:</b>
              {` `}Viewing in preview mode{' '}
              <Link href={`/api/clear-preview`}>
                <a>Exit Preview</a>
              </Link>
            </div>
          </div>
        )}
        <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
          <h1>My Notion PROJECTS</h1>
          {projects.length === 0 && (
            <p className={blogStyles.noposts}>There are no projects yet</p>
          )}
          {projects.map(project => {
            return (
              <div className={blogStyles.projectPreview} key={project.Slug}>
                <h3>
                  <Link
                    href="/[lang]/projects/[slug]"
                    as={getBlogLink(lang as string, 'projects', project.Slug)}
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
                  <div className="posted">
                    Posted: {getDateStr(project.Date)}
                  </div>
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
  const projects = await getProjects(params.lang)

  return {
    props: {
      preview: preview || false,
      projects,
    },
    unstable_revalidate: 10,
  }
}
