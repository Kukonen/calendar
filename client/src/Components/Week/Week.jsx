import React from 'react';
import Day from '../Day/Day';
import './Week.scss';

const Week = (props) => {

    const days = props.days.map(day => {
        return (
            <Day number={day.number} free={day.free} activity={day.activity}/>
        )
    })

    return (
        <div>
            {days}
        </div>
    )
}

export default Week;