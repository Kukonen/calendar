import React from 'react';
import './Day.scss';

import AddIcon from './Add.svg';
import ShowIcon from './Show.svg';

const Day = (props) => {
    const {number, free, activity} = props;
    // console.log(number, free, activity)
    return (
        <div className = "Day">
            <div className={free ? "DayNumber DayNumberFree" : "DayNumber"}>
                <span className="DayNumberText">{number}</span>
            </div>
            <div>{
                activity ?  
                    <img className="DayImg" src={ShowIcon} alt="show" /> :
                    <img className="DayImg" src={AddIcon} alt="add" />
            }</div>
        </div>
    )
}

export default Day;