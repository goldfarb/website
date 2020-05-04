import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import pressListStyle from '~components/common/press-list.module.scss'
import { Byline } from '~components/pages/blog/byline'
import Paragraph from './paragraph'
import CtaLink from './cta-link'
import blogListStyles from './blog-list.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(
        sort: { fields: publishDate, order: DESC }
        limit: 3
      ) {
        edges {
          node {
            title
            slug
            authors {
              name
              twitterLink
              link
              headshot {
                file {
                  fileName
                }
                resize(width: 100) {
                  width
                  height
                  src
                }
              }
            }
            publishDate(formatString: "MMMM D, YYYY")
            lede {
              lede
            }
          }
        }
      }
    }
  `)
  const posts = data.allContentfulBlogPost.edges
  return (
    <>
      <Paragraph>
        See how we work, what we&apos;re learning, and what&apos;s changing in
        our data on our project blog.
      </Paragraph>
      <div className={blogListStyles.container}>
        <ul className={`press-list ${pressListStyle.pressList}`}>
          {posts.map(({ node }) => (
            <li
              key={`homepage-blog-${node.slug}`}
              className={blogListStyles.blogItem}
            >
              <h2>
                <Link to={`/blog/${node.slug}`}>{node.title}</Link>
              </h2>
              <p className={blogListStyles.lede}>{node.lede.lede}</p>
              <Byline
                authors={node.authors}
                date={node.publishDate}
                smallmargin
              />
            </li>
          ))}
        </ul>
        <CtaLink to="/blog" centered>
          See more from our blog
        </CtaLink>
      </div>
    </>
  )
}
