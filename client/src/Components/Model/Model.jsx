import React, {useEffect} from 'react';
import Profile from './Mods/Profile';
import Login from './Mods/Login';
import './Model.scss';
import Register from './Mods/Register';

const Model = (props) => {

    const {mode, onСlose} = props;

    const close = (event) => {
        if (event.code === "Escape") {
            onСlose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', close)
        return () => {
            document.removeEventListener('keydown', close)
        }
    })

    if (mode === "login") {
        return (
            <Login />
        )
    } else if (mode === "register") {
        return (
            <Register />
        )
    } else if (mode === "profile") {
        return (
            <Profile />
        )
    } else if (mode === "invisible") {
        return (
            <div></div>
        )
    }
}

export default Model;