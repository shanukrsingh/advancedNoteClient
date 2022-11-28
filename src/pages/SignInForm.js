import React from 'react'
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import "./SignIn.css";



function App() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:2000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful')
            history.push('/dashboard')
        } else {
            alert('Please check your username and password')
        }
    }

    return (
        // <div>
        //     <h1>Login</h1>
        //     <form onSubmit={loginUser}>
        //         <input
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             type="email"
        //             placeholder="Email"
        //         />
        //         <br />
        //         <input
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             type="password"
        //             placeholder="Password"
        //         />
        //         <br />
        //         <input type="submit" value="Login" />
        //     </form>
        // </div>



        <div className="App">
            <div className="appAside" />
            <div className="appForm">
                <div className="pageSwitcher">
                    <Link
                        to="/login"
                        className="pageSwitcherItem-active"
                    >
                        Sign In
                        </Link>
                    <Link
                        to="/register"
                        className="pageSwitcherItem"
                    >
                        Sign Up
                        </Link>
                </div>

                <div className="formTitle">
                    <Link to="/login" className="pageSwitcherItem-active">
                        Sign In
                        </Link>{" "}
                        or{" "}
                    <Link
                        to="/register"
                        className="pageSwitcherItem"
                    >
                        Sign Up
                        </Link>
                </div>




                <div className="formCenter">
                    <form className="formFields" onSubmit={loginUser}>
                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="email">
                                E-Mail Address
                        </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                                className="formFieldInput"
                            />
                        </div>

                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="password">
                                Password
                        </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="formFieldInput"
                            />
                        </div>

                        <div className="formField">
                            <button className="formFieldButton">Sign In</button>{" "}
                            <Link to="/register" className="formFieldLink">
                                Create an account
                    </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}



export default App


