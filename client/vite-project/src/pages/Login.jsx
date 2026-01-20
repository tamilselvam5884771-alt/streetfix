import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../style.css'

const Login = () => {
    const navigate = useNavigate();
    const [isToggled, setIsToggled] = useState(false)

    // State for forms
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUpClick = (e) => {
        e.preventDefault()
        setIsToggled(true)
    }

    const handleSignInClick = (e) => {
        e.preventDefault()
        setIsToggled(false)
    }

    // API Handlers
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('/api/auth/register', { name, email, password })
            if (data.success) {
                alert("Registration Successful! Please Login.")
                setIsToggled(false) // Switch to login view
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed")
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('/api/auth/login', { email, password })
            if (data.success) {
                // Redirect to Dashboard
                navigate('/dashboard');
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed")
        }
    }

    return (
        <div className={`auth-wrapper ${isToggled ? 'toggled' : ''}`}>
            {/* Same UI Structure as before */}
            <div className="background-shape"></div>
            <div className="secondary-shape"></div>
            <div className="credentials-panel signin">
                <h2 className="slide-element">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="field-wrapper slide-element">
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="">Email</label>
                        <i className="fa-solid fa-user"></i>
                    </div>

                    <div className="field-wrapper slide-element">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="">Password</label>
                        <i className="fa-solid fa-lock"></i>
                    </div>

                    <div className="field-wrapper slide-element">
                        <button className="submit-button" type="submit">Login</button>
                    </div>

                    <div className="switch-link slide-element">
                        <p>Don't have an account? <br /> <a href="#" className="register-trigger" onClick={handleSignUpClick}>Sign Up</a></p>
                    </div>
                </form>
            </div>

            <div className="welcome-section signin">
                <h2 className="slide-element">WELCOME BACK!</h2>
            </div>

            <div className="credentials-panel signup">
                <h2 className="slide-element">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="field-wrapper slide-element">
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="">Username</label>
                        <i className="fa-solid fa-user"></i>
                    </div>

                    <div className="field-wrapper slide-element">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="">Email</label>
                        <i className="fa-solid fa-envelope"></i>
                    </div>

                    <div className="field-wrapper slide-element">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="">Password</label>
                        <i className="fa-solid fa-lock"></i>
                    </div>

                    <div className="field-wrapper slide-element">
                        <button className="submit-button" type="submit">Register</button>
                    </div>

                    <div className="switch-link slide-element">
                        <p>Already have an account? <br /> <a href="#" className="login-trigger" onClick={handleSignInClick}>Sign In</a></p>
                    </div>
                </form>
            </div>

            <div className="welcome-section signup">
                <h2 className="slide-element">WELCOME!</h2>
            </div>

        </div>
    )
}

export default Login
