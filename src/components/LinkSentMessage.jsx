import React from 'react';
import '../styles/SuccessMessage.css';
import verificationsucceeded from '../images/verification-succeeded.png';

const LinkSentMessage = () => {
    return (
        <div className="center">
            
            <h2>Verification Email Sent!</h2>

            <div className="verification-image">
                <img src={verificationsucceeded} className="img-fluid" alt="Verified" />
            </div>

            <p>
                We sent an email to complete your registration.
                Check your spam folder in case the email was incorrectly identified.
            </p>
                Did not recieve any email?<br/>
                <a href="#">Resend the verification link</a>
            
        </div>
    );
};

export default LinkSentMessage