import React, {useEffect, useState} from 'react';
import './Activity.scss';
import axios from 'axios';

import { ReactComponent as DeleteImg } from './delete.svg';
import { ReactComponent as SaveImg } from './save.svg';

const Activity = (props) => {

    // we use defaultValue with props becouse, if note will be change, then with setNote all will be ok,
    // if user will save without change, then save note be use and server will not be forced to change database

    const {mode, onСlose} = props;

    const date = new Date(props.date);

    const [note, setNote] = useState("");

    useEffect(() => {
        if (mode === "active") {
            const activity = JSON.parse(localStorage.getItem('activity'))

            const day =  date.getDate();

            let calendarDate =  date;
            calendarDate.setDate(1);
            calendarDate.setHours(1);
            calendarDate.setMinutes(1);
            calendarDate.setSeconds(1);
            calendarDate.setMilliseconds(1);

            const idxActivity = activity.map(act => act.date).findIndex(actDate => 
                actDate === calendarDate.getTime()
            );

            if (idxActivity === -1) {
                return;
            }

            const idxDay = activity[idxActivity].notes.map(notes => notes.day).indexOf(day);

            if (idxDay === -1) {
                return;
            }

            const activityNote = activity[idxActivity].notes[idxDay].note;

            setNote(activityNote);
        }
    }, [mode])

    const close = (event) => {
        if (event.code === "Escape") {
            setNote("");
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

        let activity = JSON.parse(localStorage.getItem('activity'))

        const day =  date.getDate();

        let calendarDate =  new Date(date);
        calendarDate.setDate(1);
        calendarDate.setHours(1);
        calendarDate.setMinutes(1);
        calendarDate.setSeconds(1);
        calendarDate.setMilliseconds(1);

        const idxActivity = activity.map(act => act.date).findIndex(actDate => 
            actDate === calendarDate.getTime()
        );

        if (idxActivity === -1) {
            setNote("");
        } else {
            const idxDay = activity[idxActivity].notes.map(notes => notes.day).indexOf(day);

            if (idxDay === -1) {
                setNote("");
            } else {
                if (activity[idxActivity].notes.length > 1) {
                    activity[idxActivity].notes.splice(idxDay ,1);
                } else {
                    if (activity.length > 1) {
                        activity.slice(idxDay ,1);
                    } else {
                        activity = []
                    }
                }

                localStorage.setItem('activity', JSON.stringify(activity));

                axios.post('calendar/deletenote', {
                    date: calendarDate.getTime()
                }).then(response => {
                    setNote("");
                }).catch(e => {
            
                })
            } 
        }

        localStorage.setItem('activity', JSON.stringify(activity))

        axios.post("calendar/deletenote", {
            date: date.getTime(),
            note
        }).then().catch(e => {
            
        })
    }

    const noteSave = () => {
        if (note === "") {
            return;
        }

        const activity = JSON.parse(localStorage.getItem('activity'))

        const day =  date.getDate();

        let calendarDate =  new Date(date);
        calendarDate.setDate(1);
        calendarDate.setHours(1);
        calendarDate.setMinutes(1);
        calendarDate.setSeconds(1);
        calendarDate.setMilliseconds(1);

        const idxActivity = activity.map(act => act.date).findIndex(actDate => 
            actDate === calendarDate.getTime()
        );

        if (idxActivity === -1) {
            activity.push({
                date: calendarDate.getTime(),
                notes: [
                    {
                        day,
                        note
                    }
                ]
            })
        
        } else {
            const idxDay = activity[idxActivity].notes.map(notes => notes.day).indexOf(day);

            if (idxDay === -1) {
                activity[idxActivity].notes.push({
                    day,
                    note
                })
            } else {
                activity[idxActivity].notes[idxDay].note = note;
            }
        }

        localStorage.setItem('activity', JSON.stringify(activity))
        
        axios.post("calendar/savenote", {
            date: date.getTime(),
            note
        }).then().catch(e => {
            
        })
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
                        defaultValue={note}
                    >
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default Activity;