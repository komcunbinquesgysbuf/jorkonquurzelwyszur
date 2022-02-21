import React, {useEffect, useState} from "react"
import {graphql} from "gatsby"
import Layout from "../../components/layout";
import {unified} from "unified";
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import PageSection from "../../components/page-section";

const slugify = path => (path || '').replace(/\W+/g, '_').replace(/_/g, '-');

const Template = ({data}) => {
    const {markdownRemark, allMarkdownRemark} = data
    const {frontmatter, html, parent} = markdownRemark
    const [sections, setSections] = useState([]);
    const className = slugify(parent.relativePath);
    useEffect(
        () => {
            Promise
                .all(
                    (frontmatter.sections || []).map((s, i) => {
                        const includedDocument = s.template === 'include'
                            && allMarkdownRemark.nodes.find(n => n.fileAbsolutePath.substr(-s.file.length) === s.file);
                        const includedSlug = includedDocument ? slugify(includedDocument.parent.relativePath) : 'error';
                        const fallback = {
                            frontmatter: {title: `Fehler`, subtitle: `Datei nicht gefunden.`},
                            html: `<p class="error">Die angegebene Datei <code>${s.file}</code>, `
                                + `die hier eingebettet werden sollte, existiert nicht.</p>`
                        };
                        const className = `${s.template} section-${i + 1}`;
                        return s.template === 'section'
                                ? unified().use(remarkParse).use(remarkRehype).use(rehypeStringify)
                                    .process(s.content)
                                    .then(({value}) => ({frontmatter: s, html: value, className}))
                                : Promise.resolve(s.template === 'include'
                                    ? {...(includedDocument || fallback), className: `${className} ${includedSlug}`}
                                    : {frontmatter: s, html: null, className}
                                );
                        }
                    )
                )
                .then(setSections)
        },
        [frontmatter.sections, allMarkdownRemark.nodes]
    );
    return <Layout>
        <PageSection
            className={className}
            title={frontmatter.title || null}
            subtitle={frontmatter.subtitle || null}
            image={frontmatter.image || null}
            isImage={frontmatter.template === 'image'}
            isArticle={frontmatter.isArticle || false}
            date={frontmatter.date || null}
            author={frontmatter.author || null}
        >
            <div dangerouslySetInnerHTML={{__html: html}}/>
            {sections.map(({frontmatter, html, className}) =>
                <PageSection
                    className={className}
                    title={frontmatter.title || null}
                    subtitle={frontmatter.subtitle || null}
                    image={frontmatter.image || null}
                    isImage={frontmatter.template === 'image'}
                    isArticle={frontmatter.isArticle || false}
                    date={frontmatter.date || null}
                    author={frontmatter.author || null}
                >
                    <div dangerouslySetInnerHTML={{__html: html}}/>
                </PageSection>
            )}
        </PageSection>
    </Layout>
};
export const pageQuery = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                subtitle
                image {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                isArticle
                author
                date(formatString: "DD. MMMM YYYY", locale: "de_DE")
                sections {
                    template
                    title
                    subtitle
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    file
                    content
                }
            }
            html
            parent {
                ... on File {
                    relativePath
                }
            }
        }
        allMarkdownRemark(filter: {fileAbsolutePath: {glob: "**/src/articles/*.md"}}) {
            nodes {
                fileAbsolutePath
                frontmatter {
                    title
                    subtitle
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    isArticle
                    author
                    date(formatString: "DD. MMMM YYYY", locale: "de_DE")
                }
                html
                parent {
                    ... on File {
                        relativePath
                    }
                }
            }
        }
    }
`
export default Template;
