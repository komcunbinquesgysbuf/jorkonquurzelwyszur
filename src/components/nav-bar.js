import React from "react"
import {Link, navigate} from "gatsby"
import {getUser, logout} from "../services/auth"

export default function NavBar() {
    const user = getUser();
    const onLogout = event => {
        event.preventDefault();
        logout(() => navigate(`/app/login`))
    };
    return <div className="navigation" role="navigation">
        <input type="checkbox" id="ckrh130vr00026686mnjl9jmw"/>
        <label className="toggle-menu" htmlFor="ckrh130vr00026686mnjl9jmw">
            <i className="one"></i>
            <i className="two"></i>
            <i className="three"></i>
        </label>
        <ul className="pages">
            <li className="active" aria-current="page"><em>Home</em></li>
            <li><Link to="/page-2">Products</Link></li>
            <li><Link to="/test">References</Link></li>
            <li><Link to="/using-ssr">Jobs</Link></li>
            <li><Link to="/news/first">News</Link></li>
            <li><Link to="/hello-world">Contact</Link></li>
            <li><Link to="/app/profile" className="icon" title=" Retailers">🏬</Link></li>
            {user ? <li><a href="/" onClick={onLogout}>Logout</a></li> : null}
            <li><a href="/admin" title=" Editors">📝</a></li>
        </ul>
        <ul className="other-languages">
            <li><Link title="Deutsch" to="/using-dsg">de</Link></li>
            <li className="active" aria-current="page"><em title="English">en</em></li>
        </ul>
    </div>;
}