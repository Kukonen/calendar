import React from 'react'
import Header from '../Header/Header';
import Month from '../Month/Month'

const App = () => {

    const weeks = [
        [
            {number: 30, free: true, activity: false, sameMonth: false},
            {number: 31, free: true, activity: true, sameMonth: false},
            {number: 1, free: false, activity: false, sameMonth: true},
            {number: 2, free: true, activity: false, sameMonth: true},
            {number: 3, free: false, activity: false, sameMonth: true},
            {number: 4, free: true, activity: false, sameMonth: true},
            {number: 5, free: true, activity: false, sameMonth: true},
        ],
        [
            {number: 6, free: true, activity: false, sameMonth: true},
            {number: 7, free: true, activity: true, sameMonth: true},
            {number: 8, free: false, activity: false, sameMonth: true},
            {number: 9, free: true, activity: false, sameMonth: true},
            {number: 10, free: false, activity: false, sameMonth: true},
            {number: 11, free: true, activity: false, sameMonth: true},
            {number: 12, free: true, activity: false, sameMonth: true},
        ],
        [
            {number: 13, free: true, activity: false, sameMonth: true},
            {number: 14, free: true, activity: true, sameMonth: true},
            {number: 15, free: false, activity: false, sameMonth: true},
            {number: 16, free: true, activity: false, sameMonth: true},
            {number: 17, free: false, activity: false, sameMonth: true},
            {number: 18, free: true, activity: false, sameMonth: true},
            {number: 19, free: true, activity: false, sameMonth: true},
        ],
        [
            {number: 20, free: true, activity: false, sameMonth: true},
            {number: 21, free: true, activity: true, sameMonth: true},
            {number: 22, free: false, activity: false, sameMonth: true},
            {number: 23, free: true, activity: false, sameMonth: true},
            {number: 24, free: false, activity: false, sameMonth: true},
            {number: 25, free: true, activity: false, sameMonth: true},
            {number: 26, free: true, activity: false, sameMonth: true},
        ],
        [
            {number: 27, free: true, activity: false, sameMonth: true},
            {number: 28, free: true, activity: true, sameMonth: true},
            {number: 29, free: false, activity: false, sameMonth: true},
            {number: 30, free: true, activity: false, sameMonth: true},
            {number: 1, free: false, activity: false, sameMonth: false},
            {number: 2, free: true, activity: false, sameMonth: false},
            {number: 3, free: true, activity: false, sameMonth: false},
        ]
    ]

    return (
        <div>
            <Header/>
            <Month weeks={weeks} />
        </div>
    )
}

export default App;