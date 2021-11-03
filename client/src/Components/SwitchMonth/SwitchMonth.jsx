import React from 'react';
import './SwitchMonth.scss'

const SwitchMonth = (props) => {

    const {early, later } = props; 

    return (
        <div className="SwitchMonth">
            <div className="SwitchMonthBlock" onClick={() => early()}>
                <span>A Month Early</span>
            </div>
            <div className="SwitchMonthBlock" onClick={() => later()}>
                <span>A Month Later</span>
            </div>
        </div>
    )
}

export default SwitchMonth;