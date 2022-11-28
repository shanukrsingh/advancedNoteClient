import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

import "./SignIn.css";


const App = () => {
    return (
        // <div>
        //     <BrowserRouter>
        //         <Route path="/login" exact component={SignInForm} />
        //         <Route path="/register" exact component={SignUpForm} />
        //         <Route path="/dashboard" exact component={EvernoteClone} />
        //     </BrowserRouter>
        // </div>



        <Router basename="">
            <div className="App">
                <div className="appAside" />
                <div className="appForm">
                    <div className="pageSwitcher">
                        <NavLink
                            to="/login"
                            activeClassName="pageSwitcherItem-active"
                            className="pageSwitcherItem"
                        >
                            Sign In
                        </NavLink>
                        <NavLink
                            exact
                            to="/register"
                            activeClassName="pageSwitcherItem-active"
                            className="pageSwitcherItem"
                        >
                            Sign Up
                        </NavLink>
                    </div>

                    <div className="formTitle">
                        <NavLink
                            to="/login"
                            activeClassName="formTitleLink-active"
                            className="formTitleLink"
                        >
                            Sign In
                        </NavLink>{" "}
                        or{" "}
                        <NavLink
                            exact
                            to="/register"
                            activeClassName="formTitleLink-active"
                            className="formTitleLink"
                        >
                            Sign Up
                        </NavLink>
                    </div>
                    <Route path="/register" exact component={SignUpForm} />
                    <Route path="/login" exact component={SignInForm} />
                    <Route path="/" exact component={SignInForm} />
                </div>
            </div>
        </Router>
    )
}

export default App
