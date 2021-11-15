import React, {useState} from 'react';
import '../Model.scss';
import axios from 'axios';

const Login = (props) => {

    const {changeMode} = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const Send = () => {
        if (email === "" || email.indexOf('@') === -1) {
            setError("Invalid email");
        }
        if (password === "") {
            setError("Invalid pasword");
        }
        axios.post('auth/login', {
            email,
            password
        }).then(response => {
            if (response.data.status === "ok") {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                changeMode("invisible");
            }
        })
    }

    return (
        <div id="model">
                <div id="ModelBlock">
                    <div className="ModelHeadline">Sign In</div>
                    <div className="ModelInputBlock">
                        <input className="ModelInput" 
                            type="email" 
                            placeholder="email"
                            onChange={e => {
                                setError("");
                                setEmail(e.target.value);
                            }}
                            value={email} 
                        />
                    </div>
                    <div className="ModelInputBlock">
                        <input className="ModelInput" 
                            type="password" 
                            placeholder="password" 
                            onChange={e => {
                                setError("");
                                setPassword(e.target.value);
                            }}
                            value={password} 
                        />
                    </div>
                    <div className="ModelLinkBlock"
                        onClick={() => changeMode("register")}
                    >
                        You have not account? 
                    </div>
                    <div className="ModelInputBlock">
                        <input 
                            className="ModelButton"
                            type="submit"
                            value="Login"
                            onClick={() => Send()}
                        />
                    </div>
                    {
                        error !== "" ? 
                            <div className="ModelErrorBlock">
                                <div className="ModelError">
                                    {
                                        error
                                    }
                                </div>
                            </div> :
                            null
                    }
                </div>
        </div>
    )
}

export default Login;