import React, {useEffect} from 'react';
import Profile from './Mods/Profile';
import Login from './Mods/Login';
import './Model.scss';
import Register from './Mods/Register';

const Model = (props) => {

    const {mode, onСlose, changeMode} = props;

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
    const changeModelMode = (mode) => {
        changeMode(mode)
    }

    if (mode === "login") {
        return (
            <Login changeMode={changeModelMode}/>
        )
    } else if (mode === "register") {
        return (
            <Register changeMode={changeModelMode}/>
        )
    } else if (mode === "profile") {
        return (
            <Profile onClose={onСlose}/>
        )
    } else if (mode === "invisible") {
        return (
            <div></div>
        )
    }
}

export default Model;