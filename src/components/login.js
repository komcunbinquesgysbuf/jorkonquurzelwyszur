import React, {useState} from "react"
import {navigate} from "gatsby"
import {performLogin} from "../services/auth"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = event => {
        event.preventDefault()
        performLogin(username, password).then(
            () => navigate(`/app/profile`),
            err => window.alert(err)
        )
    }
    return <>
        <h1>Log in</h1>
        <form
            method="post"
            onSubmit={event => handleSubmit(event)}
        >
            <label>
                Username
                <input type="text" value={username} name="username" onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                Password
                <input
                    type="password" value={password}
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <input type="submit" value="Log In"/>
        </form>
    </>
}
export default Login