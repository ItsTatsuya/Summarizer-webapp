import React, { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Import the check circle icon
import "./Signup.css";
// require("dotenv").config()

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        'At least 8 characters': false,
        'At least one uppercase letter': false,
        'At least one lowercase letter': false,
        'At least one digit': false,
        'At least one special character': false
    });

    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        // Redirect the user to the backend route for Google OAuth authentication
        window.open(
           `${process.env.REACT_APP_API_URL}/auth/google/callback`,
           "_self"
        );
        
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                setPasswordsMatch(true);
                const { data } = await axios.post("/register", { name, email, password });
                if (data.error) {
                    toast.error(data.error);
                } else {
                    toast.success("Check your Email for verification");
                    const verificationInterval = setInterval(async () => {
                        try {
                            const response = await axios.get(`/register/user/${email}`);
                            console.log(response.data.verified);
                            if (response.data.verified === true) { // Check the data received from the response
                                clearInterval(verificationInterval); // Stop the interval once verified
                                navigate("/"); // Navigate to home page after verification
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }, 5000); // Check every 5 seconds
    
                    // Clean up function to clear interval when component unmounts
                    return () => clearInterval(verificationInterval);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setPasswordsMatch(false);
        }
    };

    const checkPasswordRequirements = (value) => {
        // Regular expressions to check for each requirement
        const regex = {
            length: /.{8,}/,
            uppercase: /[A-Z]/,
            lowercase: /[a-z]/,
            digit: /\d/,
            specialChar: /[^A-Za-z0-9]/
        };

        const requirementsMet = {
            'At least 8 characters': regex.length.test(value),
            'At least one uppercase letter': regex.uppercase.test(value),
            'At least one lowercase letter': regex.lowercase.test(value),
            'At least one digit': regex.digit.test(value),
            'At least one special character': regex.specialChar.test(value)
        };

        setPasswordRequirements(requirementsMet);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='body'>
            <div className='main'>
                <h1 className='header'>Register</h1>
                <p className='text'>Enter your information to create an account</p>

                <form className='registerform' onSubmit={handleFormSubmit}>
                    <label htmlFor='name'>Full name</label>
                    <input type='text' id='name' name='name'
                        value={name} onChange={(e) => setName(e.target.value)} required />

                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email'
                        value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor='password'>Password</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkPasswordRequirements(e.target.value);
                            }}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>

                    <div className='content'>
                        <p className='passwordhead'>Password Must Contain</p>
                        <ul className="requirement-list">
                            {Object.entries(passwordRequirements).map(([key, value]) => (
                                <li key={key}>
                                    <FontAwesomeIcon
                                        icon={value ? faCheckCircle : "solid-circle"} // Use check circle or solid circle icon based on requirement met
                                        className={value ? "requirement-checked" : "requirement-unchecked"}
                                    />
                                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <input type='password' id='confirmpassword' name='confirmpassword'
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    {!passwordsMatch &&
                        <p className='error-password'>Passwords do not match</p>
                    }

                    <div className='register'>
                        <button type='submit' className='registerbutton'>Register</button>
                    </div>

                    <div className='Rgoogle'>
                        <button type='submit' onClick={handleGoogleSignIn} className='Rgooglebutton'>Register with Google</button>
                    </div>

                    <div className='login'>
                        <p className='logintext'>Already have an account? <br />
                            <Link to={"/login"} className='loginlink'>Log in instead</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
