import React, { useState } from 'react';
import axios from 'axios';

const OTPValidationScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [otpSent, setOTPSent] = useState(false);

  const sendOTP = async () => {
    try {
        const response = await axios.post(
            '/api/dev/bulkV2', // use the proxied endpoint
            {
              route: 'otp',
              message: 'Your OTP for verification is {{otp}}.',
              language: 'english',
              numbers: [phoneNumber],
              sender_id: 'YOUR_SENDER_ID',
              otp: 6, // 6-digit OTP
            },
            {
              headers: {
                authorization: 'YOUR_FAST2SMS_API_KEY',
                'Content-Type': 'application/json',
              },
            }
          );
          
      if (response.data.return === true) {
        setOTPSent(true);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const validateOTP = () => {
    // You would typically call an API to validate the OTP here
    console.log('OTP validated successfully');
  };

  return (
    <div>
      <h2>OTP Validation</h2>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <br />
      {!otpSent ? (
        <button onClick={sendOTP}>Send OTP</button>
      ) : (
        <>
          <label>
            OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </label>
          <br />
          <button onClick={validateOTP}>Validate OTP</button>
        </>
      )}
    </div>
  );
};

export default OTPValidationScreen;
