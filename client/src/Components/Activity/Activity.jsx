import React, {useEffect} from 'react';
import './Activity.scss';

import { ReactComponent as DeleteImg } from './delete.svg';
import { ReactComponent as AddImg } from './add.svg';

const Activity = (props) => {

    const {mode, onСlose, note, date} = props;

    

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

    if (mode !== 'active') {
        return null;
    }
    
    return (
        <div id = "activity">
            <div id ="activityBlock">
                <div className="activityHeadline">Note</div>
                <div className="activityButtonSection">
                    <div className="activityButtonBlock" id="activityDeleteButton">
                        <DeleteImg className="activityButton"/>
                    </div>
                    <div className="activityButtonBlock" id="activityAddButton">
                        <AddImg className="activityButton"/>
                    </div>
                </div>
                <div className="activityTextareaSection">
                    <textarea 
                        className="activityTextarea" 
                        cols="30" 
                        rows="10">
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default Activity;