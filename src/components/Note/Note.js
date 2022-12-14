import React, { useState, useEffect, useContext, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faBackward, faTrash } from '@fortawesome/free-solid-svg-icons'
import './Note.scss';
import {
    useLocation,
    useParams,
    useHistory
} from "react-router-dom";

import { putRequest, deleteRequest } from './../../utils/apiRequests';
import { BASE_URL, UPDATE_NOTE, DELETE_NOTE } from './../../utils/apiEndpoints';
import { NotesContext } from './../../context/context';
import { noteFormatDate } from './../../utils/helpers';


import ReactQuill from 'react-quill';
import { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

import QuillMarkdown from 'quilljs-markdown';
import 'quilljs-markdown/dist/quilljs-markdown-common-style.css';

import { ImageDrop } from 'quill-image-drop-module';

Quill.register('modules/markdownOptions', QuillMarkdown);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);



const Note = () => {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const notesContext = useContext(NotesContext);
    const [updatedAt, setUpdatedAt] = useState('');
    const [isArchive, setIsArchive] = useState(0);
    const [error, setError] = useState(null);
    const [allinfo, setAllinfo] = useState('');
    const [parval, setParval] = useState('');


    function findSummary() {

        let url = "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6"; // url


        var text = parval;
        console.log("input :")
        console.log(text);

        fetch(url, {
            method: "POST", body: JSON.stringify(text), headers: { Authorization: "Bearer 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" }
        })
            .then(response => response.json())
            .then(data => {
                // let textArea = document.getElementById("result");
                // // parsing the JSON value to string
                // textArea.value = JSON.stringify(data);
                var outp = data[0]["summary_text"]
                console.log("output")
                console.log(outp)
                alert(outp)

            })


    }

    const customGuy = () => (
        <button id="insertGuy" className="ql-insertGuy">
            <span style="color:blue">xyz</span>
        </button>
    );

    function handleGuy() {
        console.log("guy confirmed")
    }

    function imageHandler2() {
        var range = this.quill.getSelection();
        var value = prompt('What is the image URL');
        if (value) {
            this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
        }
        console.log("imagedone")
        console.log(this.quill)
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
                ["link", "image", "video"],
                ["clean"], ["okm"]
            ],
            'handlers': {
                "image": imageHandler2,
                insertGuy: handleGuy
            }
        },
        markdownOptions: {},
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize', 'Toolbar']
        },
        imageDrop: true
    }), [])

    useEffect(() => {
        if (location.note) {
            setTitle(location.note.title)
            setDesc(location.note.desc)
            setUpdatedAt(location.note.updatedAt)
            setIsArchive(location.note.archive)
        }
    }, [location.note])

    useEffect(() => {
        if (notesContext.notesState.length > 0) {
            const [selectednote] = notesContext.notesState.filter((e) => e._id === params.id);
            if (selectednote) {
                setTitle(selectednote.title)
                setDesc(selectednote.desc)
                setUpdatedAt(selectednote.updatedAt)
                setIsArchive(selectednote.archive)
            }
        }
    }, [notesContext.notesState])

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }


    const handleDescChange = (content, delta, source, editor) => {
        setDesc(editor.getHTML())
        // console.log(editor)
        setParval(editor.getText())
        // console.log(parval)
    }

    const handleUpdateNote = async (key) => {
        let query = {};
        if (key == 'title') {
            query['title'] = title;
        } else if (key == 'desc') {
            query['desc'] = desc;
        }

        const response = await putRequest(`${BASE_URL}${UPDATE_NOTE}${params.id}`, query);
        if (response.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'updateNoteSuccess', payload: response, id: params.id })
    }

    const handleArchiveNote = async () => {
        let query = {
            archive: 1
        };
        const response = await putRequest(`${BASE_URL}${UPDATE_NOTE}${params.id}`, query);
        if (response.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'archiveNoteSuccess', id: params.id });
        resetState();
        history.push(`/all-notes`)
    }

    const handleUnArchiveNote = async () => {
        let query = {
            archive: 0
        }

        const response = await putRequest(`${BASE_URL}${UPDATE_NOTE}${params.id}`, query);
        if (response.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'archiveNoteSuccess', id: params.id })
        resetState();
        history.push(`/trash`)
    }

    const handleDeleteNote = async () => {
        const response = await deleteRequest(`${BASE_URL}${DELETE_NOTE}${params.id}`);
        if (response.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'deleteNoteSuccess', id: response })
        resetState();
        history.push('/trash');
    }

    const resetState = () => {
        setTitle('');
        setDesc('');
        setUpdatedAt('');
        setIsArchive(0);
        setError(null);
    }

    return (
        <div className="note">
            <div className="note__header">
                <div className="note__header-date">
                    Last edited on {noteFormatDate(updatedAt)}
                </div>
                <div className="note__header-action-btn">
                    <div className="action-btn" onClick={findSummary}>
                        SUMUP
                    </div>
                    {!isArchive ?
                        (
                            <div className="action-btn" onClick={handleArchiveNote}>
                                <FontAwesomeIcon icon={faArchive} />
                            </div>
                        ) :
                        (
                            <>
                                <div className="action-btn">
                                    <FontAwesomeIcon icon={faBackward} onClick={handleUnArchiveNote} />
                                </div>
                                <div className="action-btn" onClick={handleDeleteNote}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </>
                        )}
                </div>
            </div>
            <div className="note__body">
                <div className="note__body-head">
                    <input value={title} placeholder="Title" onChange={handleTitleChange} onBlur={() => handleUpdateNote('title')} />
                </div>
                {/* <div className="note__body-content">
                    <textarea value={desc} placeholder="Start writing" onChange={handleDescChange} onBlur={() => handleUpdateNote('desc')} />
                </div> */}
                <div className="quillbody">
                    <ReactQuill theme="snow" value={desc} onChange={handleDescChange} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleUpdateNote('desc');
                        }
                    }}
                        placeholder="Write Something"
                        modules={modules}
                    />
                </div>
            </div>
        </div>
    )
}

export default Note;