import React from "react"
import {graphql} from "gatsby";
import Layout from "../../components/layout";
import {unified} from "unified";
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import PageSection from "../../components/page-section";

const applyErrorTemplate = function (index, subtitle, before, code, after) {
    return (
        <PageSection key={index} className={`section-${index + 1} error`} title='Fehler' subtitle={subtitle}>
            <p className="error">
                {before}{' '}<code>{code}</code>{' '}{after}
            </p>
        </PageSection>
    );
};
const applyImageTemplate = function (index, frontmatter) {
    return <PageSection key={index} className={`section-${index} image`} {...frontmatter} isImage/>;
};
const applyIncludeTemplate = function (index, file) {
    if (file) {
        const {relativePath, childMarkdownRemark: {html, frontmatter}} = file;
        return (
            <PageSection key={index} className={`section-${index} include ${(slugify(relativePath))}`} {...frontmatter}>
                <div dangerouslySetInnerHTML={{__html: html}}/>
            </PageSection>
        );
    }
    return applyErrorTemplate(
        index,
        'Datei nicht gefunden',
        'Die angegebene Datei',
        file,
        'die hier eingebettet werden sollte, existiert nicht.'
    );
};
const applySectionTemplate = function (index, frontmatter, content) {
    return <PageSection key={index} className={`section-${index} section`} {...frontmatter}>
        <div dangerouslySetInnerHTML={{
            __html: unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).processSync(content)
        }}/>
    </PageSection>;
};
const slugify = path => (path || '').replace(/\W+/g, '_').replace(/_/g, '-');

const Template = ({data}) => {
    const {markdownRemark: {frontmatter: {sections, ...frontmatter}, html, parent: {relativePath}}} = data
    const className = slugify(relativePath);
    return <Layout>
        <PageSection className={className} {...frontmatter}>
            <div dangerouslySetInnerHTML={{__html: html}}/>
            {sections && <div className="subsections">
                {sections.map(({template, content, file, ...frontmatter}, i) => {
                    if (template === 'section') return applySectionTemplate(i, frontmatter, content)
                    if (template === 'image') return applyImageTemplate(i, frontmatter);
                    if (template === 'include') return applyIncludeTemplate(i, file);
                    return applyErrorTemplate(
                        i,
                        'Abschnitt nicht unterstützt',
                        'Der angegebene Abschnittstyp',
                        template,
                        'der hier angezeigt werden sollte, existiert nicht.'
                    );
                })}
            </div>}
        </PageSection>
    </Layout>;
};
export const pageQuery = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                subtitle
                gallery { childImageSharp { gatsbyImageData } publicURL }
                image { childImageSharp { gatsbyImageData } publicURL }
                isArticle
                author
                date(formatString: "DD. MMMM YYYY", locale: "de_DE")
                sections {
                    template
                    title
                    subtitle
                    gallery { childImageSharp { gatsbyImageData } publicURL }
                    image { childImageSharp { gatsbyImageData } publicURL }
                    file {
                        relativePath
                        childMarkdownRemark {
                            frontmatter {
                                title
                                subtitle
                                gallery { childImageSharp { gatsbyImageData } publicURL }
                                image { childImageSharp { gatsbyImageData } publicURL }
                                isArticle
                                author
                                date(formatString: "DD. MMMM YYYY", locale: "de_DE")
                            }
                            html
                        }
                    }
                    content
                }
            }
            html
            parent { ... on File { relativePath } }
        }
    }
`
export default Template;
