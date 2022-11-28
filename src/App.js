import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import EvernoteClone from './EvernoteClone';
import SignInForm from './pages/SignInForm'
import SignUpForm from './pages/SignUpForm'


const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Route path="/" exact component={SignInForm} />
				<Route path="/login" exact component={SignInForm} />
				<Route path="/register" exact component={SignUpForm} />
				<Route path="/dashboard" exact component={EvernoteClone} />
			</BrowserRouter>
		</div>
	)
}

export default App
