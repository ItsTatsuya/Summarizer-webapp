import React, { useState } from 'react';
import './VerifyAccount.css'; // CSS file for styling
import axios from 'axios';
import toast from 'react-hot-toast';

const VerifyAccount = () => {
    // Initialize state for verification status
    const [verified, setVerified] = useState(false);

    // Function to confirm verification
    const confirmVerification = async () => {
        try {
            // Extract token from URL query parameters
            const queryParams = new URLSearchParams(window.location.search);
            const token = queryParams.get('token');

            // If token is not found, show error message
            if (!token) {
                toast.error("Token not found in URL");
                return;
            }

            // Send request to server to activate account using token
            const response = await axios.get(`/activate-account?token=${token}`);

            // If server responds with status 200, show success message and update state
            if (response.status === 200) {
                toast.success("Account verified successfully!");
                setVerified(true);
            } else {
                // If server responds with an error status, show error message
                toast.error("Failed to verify account");
            }
        } catch (error) {
            // If an error occurs, log the error and show error message
            console.error("Error verifying account:", error);
            toast.error("An error occurred while verifying account");
        }
    };

    // Render a message if account is verified
    if (verified) {
        return (
            <div className="container-VA">
                <h1>Verified - Close this tab</h1>
            </div>
        );
    }

    // Render the verification form
    return (
        <div className="container-VA">
            <h1>Verify Your Account</h1>
            <div className='subtitle-VA'>
                <p className="subtitle-VA">
                    Click "Confirm" to verify your account.
                </p>
            </div>
            <div className="button-container-VA">
                <button className="button-VA" onClick={confirmVerification}>Confirm</button>
            </div>
        </div>
    );
};

export default VerifyAccount;
