import React, {useState} from 'react';
import '../Model.scss';
import axios from 'axios';

const Register = (props) => {

    const {changeMode} = props;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const Send = () => {
        if (name === "") {
            setError("Invalid name");
        }
        if (email === "" || email.indexOf('@') === -1) {
            setError("Invalid email");
        }
        if (password === "") {
            setError("Invalid pasword");
        }
        axios.post('/auth/login', {
            email,
            password
        }).then(response => {
            console.log(response.data)
        })
    }

    return (
        <div id="model">
                <div id="ModelBlock">
                    <div className="ModelHeadline">Sign up</div>
                    <div className="ModelInputBlock">
                        <input className="ModelInput" 
                            type="text" 
                            placeholder="name"
                            onChange={e => {
                                setError("");
                                setName(e.target.value);
                            }}
                            value={name}
                        />
                    </div>
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
                            placeholder="pasword"
                            onChange={e => {
                                setError("");
                                setPassword(e.target.value);
                            }}
                            value={password}
                        />
                    </div>
                    <div className="ModelLinkBlock"
                        onClick={() => changeMode("login")}
                    >
                        Aleady have account? 
                    </div>
                    <div className="ModelInputBlock">
                        <input 
                            className="ModelButton"
                            type="submit"
                            value="Register"
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

export default Register;