import React from 'react'
import Header from '../Header/Header';
import Month from '../Month/Month'

const App = () => {

    const weeks = [
        [
            {number: 1, free: true, activity: false},
            {number: 2, free: true, activity: true},
            {number: 3, free: false, activity: false},
            {number: 4, free: true, activity: false},
            {number: 5, free: false, activity: false},
            {number: 6, free: true, activity: false},
            {number: 7, free: true, activity: false},
        ],
        [
            {number: 8, free: true, activity: false},
            {number: 9, free: true, activity: true},
            {number: 10, free: false, activity: false},
            {number: 11, free: true, activity: false},
            {number: 12, free: false, activity: false},
            {number: 13, free: true, activity: false},
            {number: 14, free: true, activity: false},
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