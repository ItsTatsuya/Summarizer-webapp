import React, { useState } from 'react';
import axios from 'axios';

const SendOTP = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP has been sent

  const handleSendOTP = () => {
    axios.post('http://localhost:5000/sendOTP', { email })
      .then(response => {
        console.log(response.data);
        setOtpSent(true); // Set state to indicate OTP has been sent
        // You can further handle success here, like showing a message to the user
      })
      .catch(error => {
        console.error('Error sending OTP: ', error);
        // Handle error
      });
  };

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleSendOTP}>Send OTP</button>
      {otpSent && <p>OTP has been sent to your email.</p>} {/* Render a message if OTP has been sent */}
    </div>
  );
};

export default SendOTP;
