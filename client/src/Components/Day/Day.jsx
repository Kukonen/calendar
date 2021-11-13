import React, {useContext} from 'react';
import './Day.scss';
import { Context } from '../../context';

import AddIcon from './Add.svg';
import ShowIcon from './Show.svg';

const Day = (props) => {
    const {number, free, activity, notSameMonth} = props;

    const {openActivity} = useContext(Context);
    
    return (
        <div className = {notSameMonth ? "Day DayAnotherMonth" : "Day"}>
            <div className={free ? "DayNumber DayNumberFree" : "DayNumber"}>
                <span className="DayNumberText">{number}</span>
            </div>
            <div className="DayImageSection">{
                activity ?  
                    <img className="DayImg" src={ShowIcon} alt="show" 
                        onClick = {() => openActivity(number)}
                    /> :
                    <img className="DayImg" src={AddIcon} alt="add" 
                        onClick = {() => openActivity(number)}
                    />
            }</div>
        </div>
    )
}

export default Day;