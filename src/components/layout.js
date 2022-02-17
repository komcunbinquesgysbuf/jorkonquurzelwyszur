import React from "react"
import NavBar from "./nav-bar"
import "./layout.css";
import {Link} from "gatsby";
import {getUser} from "../services/auth";

const Layout = ({children}) => {
    const user = getUser();
    const greetingMessage = user
        ? `Hello ${user.salutation || user.first_name || ''} ${user.last_name}`
        : "You are not logged in";
    return <div className='page'>
        <div className="header" role="banner">
            <div className="sitename">
                <h1><a href="/"><i className="sitename-logo"></i>Exampl Ltd.</a></h1>
            </div>
            <div className="sitename-banner"></div>
            <div className="navigation-banner">{greetingMessage}</div>
            <NavBar/>
        </div>
        <div className="content">
            <div className="main" role="main">
                <h1>#</h1>
                {children}
            </div>
        </div>
        <div className="footer" role="contentinfo">
            <div className="siteinfo">
                <div className="notice1">
                    <p>Example Ltd.<br/>27 Nowhere Ave.<br/>Far far Away<br/>3FF6SE</p>
                </div>
                <dl>
                    <dt>Phone</dt>
                    <dd>+98 765 432</dd>
                    <dt>Fax</dt>
                    <dd>+98 765 433</dd>
                    <dt>Email</dt>
                    <dd><a href="mailto:info@example.com">info@example.com</a></dd>
                </dl>
                <ul>
                    <li><Link to="/">Impressum</Link> (de)</li>
                    <li><Link to="/">Terms &amp; Conditions</Link></li>
                    <li><Link to="/">Privacy</Link></li>
                </ul>
                <p>This website does not use any cookies and does not attempt to track you in any way.</p>
            </div>
            <div className="siteinfo-banner"></div>
        </div>
    </div>;
};

export default Layout