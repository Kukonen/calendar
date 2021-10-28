import React from 'react';
import './Month.scss';

import Week from '../Week/Week';

const Month = (props) => {

    const weeks = props.weeks.map(week => {
        return (
            <Week days={week}/>
        )
    })

    return (
        <div className="Month">
            {weeks}
        </div>
    )
}

export default Month;