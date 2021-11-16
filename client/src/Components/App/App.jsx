import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { Context } from '../../context';

import Header from '../Header/Header';
import Model from '../Model/Model';
import SwitchMonth from '../SwitchMonth/SwitchMonth';
import Month from '../Month/Month';
import Activity from '../Activity/Activity';


const App = () => {

    let weeks = [];
    const [activity, setActivity] = useState([]);

    let now = new Date();

    const [date, setDate] = useState(now)

    const early = () => {
        const newDate = date;
        newDate.setMonth(date.getMonth() - 1)
        setDate(newDate)
        changeMonthStates(newDate)
        getActivity(newDate)
    }
    const later = () => {
        const newDate = date;
        newDate.setMonth(date.getMonth() + 1)
        setDate(newDate)
        changeMonthStates(newDate)
        getActivity(newDate)
    }

    const getActivity = (date) => {
        date.setDate(1);
        axios.post('calendar/getactivity', {
            date
        }).then(response => {
            const data = response.data;
            setActivity(data.activity);
        }).catch(e => {
            
        })
    }

    getActivity(date);

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
                    notSameMonth: true
                }
            }
            for (let j = startWeekDay - 1; j < 7; ++j) {
                weeks[i][j] = {
                    number: days,
                    free: j === 5 || j === 6 ? true : false,
                    notSameMonth: false
                }
                days++;
            }
            continue;
        } 
        for (let j = 0,  k = 1; j < 7; ++j) {
            if (days <= daysInThisMonth) {
                weeks[i][j] = {
                    number: days,
                    free: j === 5 || j === 6 ? true : false,
                    notSameMonth: false
                }
                days++;
            } else {
                weeks[i][j] = {
                    number: k ,
                    free: j === 5 || j === 6 ? true : false,
                    notSameMonth: true
                }
                k++;
            }
        }
    }

    const [modelWindowMode, setModelWindowMode] = useState("invisible");

    function onСloseModelWindow() {
        setModelWindowMode("invisible")
    } 

    function onChangeModelWindowState(mode) {
        if (mode === "login" || "profile" || "register" || "invisible")
            setModelWindowMode(mode)
    }

    const [activeWindowMode, setActiveWindowMode] = useState("nonactive");
    const [activityDate, setActivityDate] = useState(0);

    // get all notes and white to localstorage
    useEffect(() => {
        axios.get(`calendar/getnote`).then(response => {
            localStorage.setItem('activity', JSON.stringify(response.data.activity))
        }).catch(e => {
            
        })
    }, [])

    const openActivity = (day) => {
        let dateOfThisActivity = date;
        dateOfThisActivity.setDate(day);
        dateOfThisActivity = dateOfThisActivity.getTime();
        if (day) {
            setActivityDate(dateOfThisActivity);
        } else {
            return;
        }

        setActiveWindowMode("active");
    }

    function onСloseActiveWindow() {
        setActiveWindowMode("nonactive")
        setActivityDate(0);
    }

    return (
        <Context.Provider value={{
            openActivity,
            early,
            later
        }}>
            <div>
                <Model 
                    mode={modelWindowMode} 
                    changeMode={onChangeModelWindowState} 
                    onСlose={onСloseModelWindow} 
                />
                <Activity 
                    mode={activeWindowMode}
                    onСlose={onСloseActiveWindow}
                    date = {activityDate}
                />
                <Header modelWindow={onChangeModelWindowState} />
                <SwitchMonth currentMonth={date.getMonth()} />
                <Month weeks={weeks} />
            </div>
        </Context.Provider>
    )
}

export default App;