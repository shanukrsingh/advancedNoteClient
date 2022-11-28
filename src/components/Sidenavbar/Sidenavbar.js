import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSearch, faPlus, faStar, faStickyNote, faTrash, faInfo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import './Sidenavbar.scss';
import { NavLink, useHistory, Link } from 'react-router-dom'
import { postRequest } from './../../utils/apiRequests';
import { BASE_URL, CREATE_NOTE } from './../../utils/apiEndpoints';
import { NotesContext } from './../../context/context';

import jwt from 'jsonwebtoken'


const Sidenavbar = () => {
    const notesContext = useContext(NotesContext);
    const history = useHistory();
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token')
    const decoded = jwt.verify(token, 'secret123')
    let email = decoded.email
    // console.log(email)

    const handleCreateNote = async () => {

        // const token = localStorage.getItem('token')
        // const decoded = jwt.verify(token, 'secret123')
        // const email = decoded.email
        // console.log(email)
        let query = {
            frontprop: email
        }

        const response = await postRequest(`${BASE_URL}${CREATE_NOTE}`, query);
        console.log(response);
        if (response.error) {
            setError(response.error);
            return false;
        }
        if (response._id) {
            notesContext.notesDispatch({ type: 'createNoteSuccess', payload: response })
            history.push({
                pathname: `/all-notes/${response._id}`,
                note: response
            })
        }

    }

    const handleDropDown = async () => {

    }


    const handleLogOut = async () => {
        localStorage.removeItem('token')
        console.log("log out")
        history.push('/login')
        history.go(0)
    }




    return (
        <div className="sidenavbar">
            <div className="sidenavbar-top">
                <div className="sidenavbar-top__profile">
                    <div className="profile-icon">
                        {email[0]}
                    </div>
                    <div className="profile-title" onClick={handleLogOut}>
                        {email}
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt} onClick={handleLogOut} />
                        {/* <Link
                            to="/login"
                            onClick={handleLogOut}
                        >
                            Sign Up
                        </Link> */}
                    </div>
                </div>
                <div className="sidenavbar-top__search">
                    <div className="search-block">
                        <FontAwesomeIcon className="icon" icon={faSearch} />
                        <input placeholder="Search" />
                    </div>
                </div>
                <div className="sidenavbar-top__create-note">
                    <div className="create-note-btn" onClick={handleCreateNote}>
                        <FontAwesomeIcon className="icon" icon={faPlus} />
                        <div className="title">
                            New Note
                        </div>
                    </div>
                </div>
                <div className="sidenavbar-top__menu-item">
                    <ul>
                        <li>
                            <NavLink to="/dummy-1">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-notes">
                                <FontAwesomeIcon className="icon" icon={faStickyNote} /> All Notes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dummy-2">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dummy-3">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dummy-4">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/trash">
                                <FontAwesomeIcon className="icon" icon={faTrash} /> Trash
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dummy-5">
                                <FontAwesomeIcon className="icon" icon={faStar} /> Dummy
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidenavbar-bottom">
                <div className="sidenavbar-bottom__need-help">
                    <FontAwesomeIcon className="icon" icon={faInfo} />
                    Need a little help?
                </div>
            </div>
        </div>
    )
}

export default Sidenavbar;