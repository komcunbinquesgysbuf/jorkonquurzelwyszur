import React from "react"
import {graphql, Link, navigate, useStaticQuery} from "gatsby"
import {getUser, logout} from "../services/auth"

export default function NavBar() {
    const {file: {childListsYaml}} = useStaticQuery(graphql`
        query NavBarStaticQuery {
            file(sourceInstanceName: {eq: "lists"}, relativePath: {eq: "nav.yml"}) {
                childListsYaml {
                    title
                    file { relativePath childMarkdownRemark { frontmatter { title } } }
                    submenu {
                        title
                        file { relativePath childMarkdownRemark { frontmatter { title } } }
                        submenu {
                            title
                            file { relativePath childMarkdownRemark { frontmatter { title } } }
                        }
                    }
                }
            }
        }
    `)
    const user = getUser();
    const onLogout = event => {
        event.preventDefault();
        logout(() => navigate(`/app/login`))
    };
    const itemTitle = (item) => item.file.childMarkdownRemark?.frontmatter.title || '';
    const itemLinkTitle = (item) => item.title || itemTitle(item);
    const itemUrl = (item) => `/${item.file.relativePath.replace(/\.\w+$/, '')}`;
    return <div className="navigation" role="navigation">
        <input type="checkbox" id="ckrh130vr00026686mnjl9jmw"/>
        <label className="toggle-menu" htmlFor="ckrh130vr00026686mnjl9jmw">
            <i className="one"></i>
            <i className="two"></i>
            <i className="three"></i>
        </label>
        <ul className="pages">
            <li><Link activeClassName='active' title={itemTitle(childListsYaml)} to={itemUrl(childListsYaml)}>{itemLinkTitle(childListsYaml)}</Link></li>
            {(childListsYaml.submenu || []).map(item => <li key={itemUrl(item)}><Link activeClassName='active' title={itemTitle(item)} to={itemUrl(item)}>{itemLinkTitle(item)}</Link></li>)}
            <li><Link activeClassName='active' to="/app/profile" className="icon" title=" Retailers">🏬</Link></li>
            {user ? <li><a href="/" onClick={onLogout}>Logout</a></li> : null}
            <li><a href="/admin" title=" Editors">📝</a></li>
        </ul>
        <ul className="other-languages">
            <li><Link activeClassName='active' title="Deutsch" to="/using-dsg">de</Link></li>
            <li className="active" aria-current="page"><em title="English">en</em></li>
        </ul>
    </div>;
}