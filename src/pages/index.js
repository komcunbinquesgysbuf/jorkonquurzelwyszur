import React from "react"
import {Link} from "gatsby"
import {getUser} from "../services/auth"
import Layout from "../components/layout"

export default function Home() {
    const user = getUser();
    return (
        <Layout>
            <h1>Hello {user ? `${user.salutation || user.first_name || ''} ${user.last_name}` : "world"}!</h1>
            <p>
                {user ? (
                    <>
                        You are logged in, so check your{" "}
                        <Link to="/app/profile">profile</Link>
                    </>
                ) : (
                    <>
                        You should <Link to="/app/login">log in</Link> to see restricted
                        content
                    </>
                )}
            </p>
        </Layout>
    )
}