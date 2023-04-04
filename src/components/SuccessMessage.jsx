import React from 'react';
import verificationsucceeded from '../images/verification-succeeded.png';

const SuccessMessage = () => {
    return (
        <div className="center">       
            <h2>Email Verification Succeeded!</h2>

            <div className="verification-image">
                <img src={verificationsucceeded} className="img-fluid" alt="Verified" />
            </div>

            <p>
                <a href="./Login">Click here</a> to login.
            </p>
        </div>
    );
};

export default SuccessMessage