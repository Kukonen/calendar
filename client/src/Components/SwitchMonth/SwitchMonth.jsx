import React, {useContext} from 'react';
import './SwitchMonth.scss'
import { Context } from '../../context';

const SwitchMonth = (props) => {

    const {currentMonth} = props; 

    const {early, later} = useContext(Context);

    const month = 
    currentMonth === 0 ? 'January' :
    currentMonth === 1 ? 'February' :
    currentMonth === 2 ? 'March' :
    currentMonth === 3 ? 'April' :
    currentMonth === 4 ? 'May' :
    currentMonth === 5 ? 'June' :
    currentMonth === 6 ? 'July' :
    currentMonth === 7 ? 'August' :
    currentMonth === 8 ? 'September' :
    currentMonth === 9 ? 'October' :
    currentMonth === 10 ? 'November' :
    currentMonth === 11 ? 'December' :
    ''

    return (
        <div className="SwitchMonth">
            <div className="SwitchMonthBlock" onClick={() => early()}>
                <span>A Month Early</span>
            </div>
            <div className="SwitchMonthTitleBlock">
                <span>{month}</span>
            </div>
            <div className="SwitchMonthBlock" onClick={() => later()}>
                <span>A Month Later</span>
            </div>
        </div>
    )
}

export default SwitchMonth;