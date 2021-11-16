import React, {useState} from 'react';
import axios from 'axios';
import '../Model.scss';

const Profile = (props) => {

    const {onClose} = props;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [passwordError, setPassowordError] = useState("");

    const [nameSuccess, setNameSuccess] = useState("");
    const [passwordSuccess, setPassowordSuccess] = useState("");

    const changeName = () => {

        if (name === "") {
            return;
        }

        axios.post('auth/changename', {
            name
        }).then(response => {
             const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                user.name = name;
                localStorage.setItem('user', JSON.stringify(user));
                setNameSuccess("name has been changed")
            }
        }).catch(e => {
            setNameError("something went wrong")
        })
    }

    const changePassword = () => {

        if (password === "") {
            return;
        }

        axios.post('auth/changepassword', {
            password
        }).then(response => {
            setPassowordSuccess("сonfirm the changes in the email")
        }).catch(e => {
            setPassowordError("something went wrong")
        })
    }

    const logout = () => {
        axios.get('auth/logout').then(response => {
            localStorage.removeItem('user');
            localStorage.removeItem('activity');
            onClose()
        }).catch(e => {

        })
    }

    return (
        <div id="model">
                <div id="ModelBlock">
                    <div className="ModelHeadline">Profile</div>
                    <div className="ModelSection">
                        <div className="ModelSectionHeadline">Change Name</div>
                        <div className="ModelInputBlock">
                            <input className="ModelInput" type="text" placeholder="new name" 
                                value={name}
                                onChange={event => {
                                    setNameError("");
                                    setNameSuccess("");
                                    setName(event.target.value);
                                }}
                            />
                            <div className="ModelButton"
                                onClick={() => changeName()}
                            >Change</div>
                        </div>
                        {
                        nameError !== "" ? 
                            <div className="ModelErrorBlock">
                                <div className="ModelError">
                                    {
                                        nameError
                                    }
                                </div>
                            </div> :
                            null
                        }
                        {
                        nameSuccess !== "" ? 
                            <div className="ModelSuccessBlock">
                                <div className="ModelSuccess">
                                    {
                                        nameSuccess
                                    }
                                </div>
                            </div> :
                            null
                        }
                    </div>
                    <div className="ModelSection">
                        <div className="ModelSectionHeadline">Change Password</div>
                        <div className="ModelInputBlock">
                        <input className="ModelInput" type="password" placeholder="new password" 
                            value={password}
                            onChange={event => {
                                setPassowordError("");
                                setPassowordSuccess("");
                                setPassword(event.target.value);
                            }}
                        />
                            <div className="ModelButton"
                                onClick={() => changePassword()}
                            >Change</div>
                        </div>
                        {
                            passwordError !== "" ? 
                                <div className="ModelErrorBlock">
                                    <div className="ModelError">
                                        {
                                            passwordError
                                        }
                                    </div>
                                </div> :
                                null
                        }
                        {
                            passwordSuccess !== "" ? 
                                <div className="ModelSuccessBlock">
                                    <div className="ModelSuccess">
                                        {
                                            passwordSuccess
                                        }
                                    </div>
                                </div> :
                                null
                        }
                    </div>
                    <div className="ModelSection">
                        <div className="ModelButton ModelLogOutButton"
                            onClick = {() => logout()}
                        >
                            Log Out
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Profile;