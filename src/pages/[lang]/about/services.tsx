import React from 'react'
import Link from 'next/link'
import Header from '../../../components/layouts/header'

import sharedStyles from '../styles/shared.module.css'
// import IndexLayout from '../components/layouts'

export default () => (
  <>
    <Header titlePre="About" langKey="en" slug="/about/services" />
    <div className={sharedStyles.layout}>
      <img
        src="/zeit-and-notion.png"
        height="85"
        width="250"
        alt="Vercel + Notion"
      />
      <h1>services page</h1>
      <h2>Blazing Fast Notion Blog with Next.js' </h2>

      <div className="explanation">
        <p>
          This is a statically generated which allow us to achieve all of the
          benefits listed above including blazing fast speeds, great local
          editing experience, and always being available!
        </p>

        <p>
          Get started by creating a new page in Notion and clicking the deploy
          button below. After you supply your token and the blog index id (the
          page's id in Notion) we will automatically create the table for you!
          See for finding the new page's id. To get your token from Notion,
          login and look for a cookie under www.notion.so with the name
          `token_v2`. After finding your token and your blog's page id you
          should be good to go!
        </p>
      </div>
    </div>
  </>
)
