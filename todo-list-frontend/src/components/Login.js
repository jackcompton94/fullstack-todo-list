import React, {useState} from 'react'
import '../styles/core.css'
import { useNavigate } from 'react-router-dom'

const Login = ({onLogin}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        // Get user credentials from login form
        const username = e.target.elements.username.value
        const password = e.target.elements.password.value
        
        navigate('/form')
        onLogin(username, password)

        console.log(`logging in: ${username}`)
    }

    return (
        <div className="webpageContainer">
            <div className="loginContainer">
                <form onSubmit={handleSubmit}>
                    <h3>sign in to task manager</h3>
                    <div className="inputContainer">
                    <input 
                        type="text" 
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div className="loginButtonContainer">
                        <button 
                            className="loginButton"
                            type="submit">
                            sign in
                        </button>
                    </div>
                    <p className="forgotPassword">forgot password?</p>
                </form>
            </div>
        <p>need an account?</p>
    </div>
     )
}

export default Login