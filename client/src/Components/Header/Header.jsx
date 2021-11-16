import React, {useState, useEffect} from 'react';
import './Header.scss';

const Header = (props) => {
    const date = new Date()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [localStorage.getItem('user')])

    const {modelWindow} = props;

    return (
        <div className = "Header">
            <div className = "HeaderBlock HeaderCalendar">Calendar</div>
            {
                user ?
                <div className = "HeaderBlock HeaderProfile" onClick={() => modelWindow("profile")}>
                    {user.name}
                </div> :
                <div className = "HeaderBlock HeaderProfile" onClick={() => modelWindow("login")}>
                    Sign in
                </div>
            }
            <div className = "HeaderBlock HeaderDate">
                Today:&nbsp;
                {date.getDate() < 10 ? "0"+ date.getDate() : date.getDate()}.
                {date.getMonth() + 1 < 10 ? "0"+ date.getMonth() + 1 : date.getMonth() + 1}.
                {date.getFullYear()}
                </div>
        </div>
    )
}

export default Header;