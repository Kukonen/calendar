import React from 'react';
import '../Model.scss';

const Login = () => {
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
}

export default Login;