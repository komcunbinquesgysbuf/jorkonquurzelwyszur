import React, {useState} from "react"
import {navigate} from "gatsby"
import {performLogin} from "../services/auth"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const handleSubmit = event => {
        event.preventDefault()
        performLogin(username, password).then(
            () => navigate(`/app/profile`),
            () => setError(true)
        )
    }
    return <>
        <h1>Log in</h1>
        {error && <p className="error">Mit den eingegebenen Zugangsdaten war der Login nicht möglich.</p>}
        <form className="contact-form" method="post" onSubmit={event => handleSubmit(event)}>
            <p className='username'>
                <label htmlFor='ckzqz41ji000npj86k4nczy51'>Username:</label>
                <input type="text" value={username} id="ckzqz41ji000npj86k4nczy51" name="username" onChange={e => setUsername(e.target.value)}/>
            </p>
            <p className='password'>
                <label htmlFor='ckzqz4inm000opj86c6cvh36v'>Password:</label>
                <input type="password" value={password} id="ckzqz4inm000opj86c6cvh36v" name="password" onChange={e => setPassword(e.target.value)}/>
            </p>
            <input type="submit" value="Log In" className="btn"/>
        </form>
    </>
}
export default Login