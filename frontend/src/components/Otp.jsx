import React from "react";
import { useVerifyMutation } from "../redux/features/users/loginUser";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Input, Button } from "antd";

const Otp = () => {
  const [verify, { data, isLoading, error, isSuccess }] = useVerifyMutation();
  const { uID } = useParams();
  console.log(uID);
  const handleVerify = () => {
    const otp = document.getElementById("otp").value;
    console.log(otp);
    const id = uID;
    try {
      const bdy = {
        otp: otp,
        uID: id,
      };
      verify(bdy);
      if (isSuccess) {
        alert("Account has been verified. Please login.");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="container">
      <h1>OTP Verification</h1>
      <p>Please enter the 6-digit code sent to your phone.</p>
      <div className="otp-input">
        <Input
          style={{ width: "200px" }}
          min={0}
          maxLength={6}
          name="otp"
          id="otp"
        />
        <Button type="link" onClick={handleVerify} loading={isLoading}>
          Verify
        </Button>
      </div>
    </div>
  );
};

export default Otp;
