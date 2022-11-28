import React, { useEffect, useState, useContext } from 'react';
import './NoteList.scss';
import {
    useRouteMatch,
    useHistory,
    NavLink
} from "react-router-dom";
import { BASE_URL, GET_ALL_NOTES, GET_TRASH_NOTES } from './../../utils/apiEndpoints';
import { getRequest } from './../../utils/apiRequests';
import { NotesContext } from './../../context/context';
import { listFormatDate } from './../../utils/helpers';

import jwt from 'jsonwebtoken'


const NoteList = (props) => {
    const [error, setError] = useState(null)
    const notesContext = useContext(NotesContext);
    const { title } = props;
    const match = useRouteMatch();
    const history = useHistory();
    useEffect(() => {
        getNotes()
    }, [match.url])

    const getNotes = async () => {
        let endpoint = '';
        if (match.url == '/all-notes') {
            endpoint = GET_ALL_NOTES;
        } else if (match.url == '/trash') {
            endpoint = GET_TRASH_NOTES;
        } else {
            return;
        }

        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email

        let response = await getRequest(`${BASE_URL}${endpoint}`)
        if (response.error) {
            setError(response.error);
            return false;
        }

        let res2 = []

        if (response.length > 0) {
            response.forEach(element => {
                console.log(element.someprp);
                if (element.someprp === email) {
                    res2.push(element)
                }
            });
        }

        response = res2


        notesContext.notesDispatch({ type: 'getAllNotesSuccess', payload: response });


        if (response.length > 0) {
            history.push({
                pathname: `${match.url}/${response[0]._id}`,
                note: response[0]
            })
        }
    }

    return (
        <div className="note-list">
            <div className="note-list__header">
                <div className="note-list__header-title">
                    <h1>{title}</h1>
                </div>
                <div className="note-list__header-sub-head">
                    <div className="note-count">
                        {notesContext.notesState.length} note
                    </div>
                </div>
            </div>
            <div className="note-list__body">
                {
                    notesContext.notesState.length > 0 ? notesContext.notesState.map((note) => (

                        <NavLink key={note._id} className="note-card" to={
                            {
                                pathname: `${match.url}/${note._id}`,
                                note
                            }
                        }>
                            <div className="note-card__head">
                                <div className="note-card__title">
                                    {note.title}
                                </div>
                                <div className="note-card__desc">
                                    {note.desc}
                                </div>
                            </div>
                            <div className="note-card__date">
                                {listFormatDate(note.updatedAt)}
                            </div>
                        </NavLink>
                    )
                    ) : <div className="empty-state">No data found</div>
                }
            </div>
        </div>
    )
}

export default NoteList;