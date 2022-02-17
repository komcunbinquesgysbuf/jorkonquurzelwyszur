import React from "react"
import {graphql} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import Layout from "../../components/layout";

const Template = ({data}) => {
    const {markdownRemark} = data
    const {frontmatter, html} = markdownRemark
    return <Layout>
        <GatsbyImage alt={''} image={getImage(frontmatter.featured)}/>
        <pre>{JSON.stringify(frontmatter.featured, null, 2)}</pre>
        <div className="blog-post">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{__html: html}}
            />
        </div>
    </Layout>
};
export const pageQuery = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
                featured {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`
export default Template;
