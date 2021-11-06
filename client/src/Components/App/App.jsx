import React from 'react'
import {useState} from 'react'

import Header from '../Header/Header';
import Model from '../Model/Model';
import SwitchMonth from '../SwitchMonth/SwitchMonth';
import Month from '../Month/Month';

const App = () => {

    let weeks = [];

    let now = new Date();

    const [date, setDate] = useState(now)

    const early = () => {
        const newDate = date;
        newDate.setMonth(date.getMonth() - 1)
        setDate(newDate)
        changeMonthStates(newDate)
    }
    const later = () => {
        const newDate = date;
        newDate.setMonth(date.getMonth() + 1)
        setDate(newDate)
        changeMonthStates(newDate)
    }

    const changeMonthStates = (newDate) => {
        setThisMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
        setLastMonth(new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1));
        setDaysInThisMonth(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());
        setDaysInLastMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate());
    }

    const [thisMonth, setThisMonth] = useState(new Date(date.getFullYear(), date.getMonth(), 1));
    const [lastMonth, setLastMonth] = useState(new Date(date.getFullYear(), date.getMonth() - 1, 1));

    const [daysInThisMonth, setDaysInThisMonth] = useState(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
    const [daysInLastMonth, setDaysInLastMonth] = useState(new Date(date.getFullYear(), date.getMonth(), 0).getDate());

    for (let i = 0, days = 1; days <= daysInThisMonth; ++i) {
        weeks.push([]);
        const startWeekDay = thisMonth.getDay() === 0 ? 7 : thisMonth.getDay();
        if (i === 0 && startWeekDay !== 0) {

            for (let j = startWeekDay - 2, k = 0; j >= 0; --j, k++) {
                weeks[i][j] = {
                    number: daysInLastMonth - k,
                    free: j === 5 || j === 6 ? true : false,
                    activity: false,
                    notSameMonth: true
                }
            }
            for (let j = startWeekDay - 1; j < 7; ++j) {
                weeks[i][j] = {
                    number: days,
                    free: j === 5 || j === 6 ? true : false,
                    activity: false,
                    notSameMonth: false
                }
                days++;
            }
            continue;
        } 
        for (let j = 0; j < 7; ++j) {
            if (days <= daysInThisMonth) {
                weeks[i][j] = {
                    number: days,
                    free: j === 5 || j === 6 ? true : false,
                    activity: false,
                    notSameMonth: false
                }
                days++;
            } else {
                weeks[i][j] = {
                    number: lastMonth.getDate() ,
                    free: j === 5 || j === 6 ? true : false,
                    activity: false,
                    notSameMonth: true
                }
                lastMonth.setDate(lastMonth.getDate() + 1);
            }
        }
    }

    const [modelWindowMode, setModelWindowMode] = useState("invisible");

    function onСloseModelWindow() {
        setModelWindowMode("invisible")
    } 

    function onChangeModelWindowState(mode) {
        if (mode === "login" || "register" || "invisible")
            setModelWindowMode(mode)
    }

    return (
        <div>
            <Model mode={modelWindowMode} onСlose={onСloseModelWindow} />
            <Header modelWindow={onChangeModelWindowState} />
            <SwitchMonth early={early} later={later} currentMonth={date.getMonth()} />
            <Month weeks={weeks} />
        </div>
    )
}

export default App;