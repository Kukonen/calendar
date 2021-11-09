import React from 'react';

const Register = () => {
    return (
        <div id="model">
                <div id="ModelBlock">
                    <div className="ModelHeadline">Sign up</div>
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
}

export default Register;