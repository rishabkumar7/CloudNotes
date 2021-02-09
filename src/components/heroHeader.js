import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            home {
              title
              description
            }
          }
        }
      }
    `}
    render={data => (
      <div className="hero-header">
        <div className="headline">{data.site.siteMetadata.home.title}</div>
        <div
          className="primary-content"
          dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.home.description }}
        />
        <iframe src="https://ghbtns.com/github-btn.html?user=rishabkumar7&repo=CloudNotes&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=rishabkumar7&repo=CloudNotes&type=watch&count=true&size=large&v=2" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=rishabkumar7&type=follow&count=true&size=large" frameborder="0" scrolling="0" width="230" height="30" title="GitHub"></iframe>
      </div>
    )}
  />
)