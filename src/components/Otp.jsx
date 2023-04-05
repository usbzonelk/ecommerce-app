import React from 'react';

const Otp = () => {
  return (
    <div className="otp container">
        <h2>Verify Your Account</h2>
        <p>We emailed you the 6 digit code to xxxx@email.com<br/>
        Enter the code below to confirm your email address</p>

        <div className="code-container">
            <input type="number" className="code" placeholder='0' min={0} max={9} required />
            <input type="number" className="code" placeholder='0' min={0} max={9} required />
            <input type="number" className="code" placeholder='0' min={0} max={9} required />
            <input type="number" className="code" placeholder='0' min={0} max={9} required />
            <input type="number" className="code" placeholder='0' min={0} max={9} required />
            <input type="number" className="code" placeholder='0' min={0} max={9} required />

        </div>

        <div className="code-button">
            <input type="submit" className="submit" value={"Verify"}
             style={{textTransform:"uppercase", fontSize:"1rem" , padding: "30px", borderRadius:"10px"}}/>
        </div>

        
    </div>
  );
};

export default Otp;
