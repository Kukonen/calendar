import React, {useContext} from 'react';
import './Day.scss';
import { Context } from '../../context';

import NoteIcon from './Note.svg';

const Day = (props) => {
    const {number, free, notSameMonth} = props;

    const {openActivity, early, later} = useContext(Context);
    
    return (
        <div className = {notSameMonth ? "Day DayAnotherMonth" : "Day"} 
        onClick = {() => {
            if (notSameMonth) {
                if (number < 15) {
                    later();
                }
                if (number > 15) {
                    early();
                }
            }
        }}
        >
            <div className={free ? "DayNumber DayNumberFree" : "DayNumber"}>
                <span className="DayNumberText">{number}</span>
            </div>
            <div className="DayImageSection">{
                    <img className="DayImg" src={NoteIcon} alt="note" 
                        onClick = {() => {
                            openActivity(number)
                        }}
                    />
            }</div>
        </div>
    )
}

export default Day;