import React from 'react';
import './Model.scss';

const Register = (props) => {

    const {mode} = props;

    if (mode === "login") {
        return (
            <div id="model">
                <div id="ModelBlock">
                    <div className="ModelHeadline">Sign In</div>
                    <div className="ModelInputBlock">
                        <input className="ModelInput" type="text" placeholder="login" />
                    </div>
                    <div className="ModelInputBlock">
                        <input className="ModelInput" type="password" placeholder="password" />
                    </div>
                    <div className="ModelInputBlock">
                        <div className="ModelButton">Send</div>
                    </div>
                </div>
            </div>
        )
    } else if (mode === "register") {
        return (
            <div id="model">
                <div id="ModelBlock">
                    <div className="ModelHeadline">Sign up</div>
                    <div className="ModelInputBlock">
                        <input className="ModelInput" type="text" placeholder="email" />
                    </div>
                    <div className="ModelInputBlock">
                        <div className="ModelButton">Send</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div></div>
    )
}

export default Register;