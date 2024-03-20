import React, { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const { data } = await axios.post("/register", { name, email, password });
                if (data.error) {
                    toast.error(data.error);
                } else {
                    toast.success("Registered");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setPasswordsMatch(false);
        }
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
                    <input type='password' id='password' name='password'
                        value={password} onChange={(e) => setPassword(e.target.value)} required />

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
                        <button type='submit' onClick={''} className='Rgooglebutton'>Register with Google</button>
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
