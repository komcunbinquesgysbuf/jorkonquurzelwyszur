import React from "react"
import PageSection from "../components/page-section";
import Layout from "../components/layout";
import {graphql, Link, useStaticQuery} from "gatsby";

const Products = () => {
    const {allPdf: {nodes}} = useStaticQuery(graphql`{
        allPdf {
            nodes {
                id
                content { metadata { Title } }
                parent { ... on File { name relativeDirectory } }
            }
        }
    }`);
    return <Layout>
        <PageSection className='products'>
            <ul>
                {nodes.map(n => (
                    <li key={n.id}>
                        <Link to={`/${n.parent.relativeDirectory}/${n.parent.name}`}>{n.content.metadata.Title || n.parent.name}</Link>
                    </li>
                ))}
            </ul>
        </PageSection>
    </Layout>;
};
export default Products;
