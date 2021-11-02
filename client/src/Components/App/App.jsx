import React from 'react'
import Header from '../Header/Header';
import Month from '../Month/Month'

const App = () => {

    let weeks = [];

    // const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
    
    let now = new Date();
    // now = new Date(now.getFullYear(), now.getMonth() - 2, 0)   // debug date

    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    const daysInThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

    for (let i = 0, days = 1; days < daysInThisMonth; ++i) {
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

    return (
        <div>
            <Header/>
            <Month weeks={weeks} />
        </div>
    )
}

export default App;