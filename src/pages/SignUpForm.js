import React from 'react'
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import "./SignIn.css";


function App() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:2000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            history.push('/login')
        }
    }

    return (
        // <div>
        //     <h1>Register</h1>
        //     <form onSubmit={registerUser}>
        //         <input
        //             value={name}
        //             onChange={(e) => setName(e.target.value)}
        //             type="text"
        //             placeholder="Name"
        //         />
        //         <br />
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
        //         <input type="submit" value="Register" />
        //     </form>
        // </div>

        <div className="App">
            <div className="appAside" />
            <div className="appForm">
                <div className="pageSwitcher">
                    <Link
                        to="/login"
                        className="pageSwitcherItem"
                    >
                        Sign In
                        </Link>
                    <Link
                        to="/register"
                        className="pageSwitcherItem-active"
                    >
                        Sign Up
                        </Link>
                </div>

                <div className="formTitle">
                    <Link to="/login" className="pageSwitcherItem">
                        Sign In
                        </Link>{" "}
                        or{" "}
                    <Link
                        to="/register"
                        className="pageSwitcherItem-active"
                    >
                        Sign Up
                        </Link>
                </div>



                <div className="formCenter">
                    <form onSubmit={registerUser} className="formFields">
                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="name">
                                Full Name
                    </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Name"
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
                            <button className="formFieldButton">Sign Up</button>{" "}
                            <Link to="/login" className="formFieldLink">
                                I'm already member
                    </Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    )
}

export default App

