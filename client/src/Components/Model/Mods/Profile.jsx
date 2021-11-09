import React from 'react';
import '../Model.scss';

const Profile = () => {
    return (
        <div id="model">
                <div id="ModelBlock">
                    <div className="ModelHeadline">Profile</div>
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

export default Profile;