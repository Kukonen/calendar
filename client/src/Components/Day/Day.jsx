import React from 'react';
import './Day.scss';

import AddIcon from './Add.svg';
import ShowIcon from './Show.svg';

const Day = (props) => {
    const {number, free, activity, sameMonth} = props;
    return (
        <div className = {sameMonth ? "Day" : "Day DayAnotherMonth"}>
            <div className={free ? "DayNumber DayNumberFree" : "DayNumber"}>
                <span className="DayNumberText">{number}</span>
            </div>
            <div className="DayImageSection">{
                activity ?  
                    <img className="DayImg" src={ShowIcon} alt="show" /> :
                    <img className="DayImg" src={AddIcon} alt="add" />
            }</div>
        </div>
    )
}

export default Day;