import React from "react"
import {graphql, navigate, useStaticQuery} from "gatsby"

const Home = () => {
    const {file: {childListsYaml: {file: {relativeDirectory, name}}}} = useStaticQuery(graphql`
        {
            file(relativePath: {eq: "nav.yml"}) {
                childListsYaml {
                    file { relativeDirectory name }
                }
            }
        }
    `);
    typeof window !== 'undefined' && navigate('/' + [relativeDirectory, name].filter(p => !!p).join('/'));
    return null;
};
export default Home;
