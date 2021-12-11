import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark

  const postTitle = frontmatter.title
  const postDescription = frontmatter.description
  const postImage = frontmatter.image
  const postUrl = "htts://glare.dev/goofs" + frontmatter.path + "/" //todo convert this to a global variable
  const postRedirect = frontmatter.author 
  const lang = `en`

  useEffect(() => {
    window.location.href=`${postRedirect}`
  }, []);

  return (
    <div className="blog-post">
          <Helmet
      htmlAttributes={{
        lang,
      }}
      title={postTitle}
      meta={[
        {
          name: 'title',
          content: postTitle,
        },
        {
          name: `description`,
          content: postDescription,
        },
        // Open Graph
        {
          name: `og:url`,
          content: postUrl,
        },
        {
          name: `og:type`,
          content: "article",
        },
        {
          property: `og:title`,
          content: postTitle,
        },
        {
          name: `og:image`,
          content: postImage,
        },
        {
          property: `og:description`,
          content: postDescription,
        },
        // Twitter
        {
          name: `twitter:url`,
          content: postUrl,
        },
        {
          property: `twitter:title`,
          content: postTitle,
        },
        {
          property: `og:description`,
          content: postDescription,
        },
        {
          name: `twitter:image`,
          content: postImage,
        },
        {
          name: `twitter:card`,
          content: "summary_large_image",
        },
      ].concat(data)}
    />
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        description
        author
        image
      }
    }
  }
`
