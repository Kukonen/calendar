import React, {useEffect, useState} from 'react';
import './Activity.scss';
import axios from 'axios';

import { ReactComponent as DeleteImg } from './delete.svg';
import { ReactComponent as SaveImg } from './save.svg';

const Activity = (props) => {

    const {mode, onСlose} = props;

    const date = new Date(props.date);

    const [note, setNote] = useState(props.note);

    const close = (event) => {
        if (event.code === "Escape") {
            onСlose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', close)
        return () => {
            document.removeEventListener('keydown', close)
        }
    })

    const noteDelete = () => {
        axios.post("calendar/deletenote", {
            date: date.getTime(),
            note
        }).then()
    }

    const noteSave = () => {
        if (note === "") {
            return;
        }
        axios.post("calendar/savenote", {
            date: date.getTime(),
            note
        }).then()
    }

    if (mode !== 'active') {
        return null;
    }
    
    return (
        <div id = "activity">
            <div id ="activityBlock">
                <div className="activityHeadline">Note</div>
                <div className="activityButtonSection">
                    <div className="activityButtonBlock" id="activityDeleteButton"
                        onClick={() => noteDelete()}
                    >
                        <DeleteImg className="activityButton"/>
                    </div>
                    <div className="activityButtonBlock" id="activitySaveButton"
                        onClick={() => noteSave()}
                    >
                        <SaveImg className="activityButton"/>
                    </div>
                </div>
                <div className="activityTextareaSection">
                    <textarea 
                        className="activityTextarea" 
                        cols="30" 
                        rows="10"
                        onChange={event => setNote(event.target.value)}
                    >
                    {
                        note
                    }
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default Activity;