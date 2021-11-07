import React from 'react';
import './Header.scss';
import Cookies from 'js-cookie';
import axios from 'axios';

const date = new Date()

const getName = () => {
    axios.post('/api/login', {
        key: Cookies.get('key')
    }).then(response => {
        return response.data.name;
    }).catch(e => {
        console.log(e);
        return null
    })
}

const name = Cookies.get('name') ?
    Cookies.get('name') :
    Cookies.get('key') ?
    getName() :
    null

const Header = (props) => {

    const {modelWindow} = props;

    return (
        <div className = "Header">
            <div className = "HeaderBlock HeaderCalendar">Calendar</div>
            {
                name ?
                <div className = "HeaderBlock HeaderProfile" onClick={() => modelWindow("profile")}>
                    {name}
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