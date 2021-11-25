import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import flixerApi from '../api/flixerApi';
import { setToken } from '../store/slices/authSlice';
import { validateEmail } from '../util/validators';
import store from '../store/store';

import './SignUp.css';

const SignUp = () => {
    const [signupForm, setSignupForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { username, email, password } = signupForm;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupForm({ ...signupForm, [name]: value });
    };

    const validFields = () => {
        const setValidationError = (errorMessage) => {
            setError(errorMessage);
            return false;
        };

        setError(null);
        if (!username) return setValidationError('Please provide a username')
        if (!email) return setValidationError('Please provide an email');
        if (!validateEmail(email)) setValidationError('Please provide a valid email');
        if (!password) return setValidationError('Please provide a password');
        return true;
    };

    const signup = async () => {
        if (validFields()) {
            try {
                setLoading(true);
                const response = await flixerApi.post('/signup', { username, email, password });
                store.dispatch(setToken(response.data));
                navigate('/');
            } catch (err) {
                console.error(err);
                alert(err.response.data.error);
            }
            setLoading(false);
        }
    };

    return (
        <div className="signup-screen">
            <div className="signup-container">
                <h1 className="title"><i className="bx bxs-movie"/> Flixer</h1>
                <div className="signup-form">
                    <h2>Sign up</h2>
                    <p>Created by movie lovers for movie lovcer</p>
                    <div className="signup-input">
                        <i className="bx bxs-user-circle" />
                        <input name="username" type="text" placeholder="Username" value={username} onChange={handleInputChange} />
                    </div>
                    <div className="signup-input">
                        <i className="bx bxs-envelope" />
                        <input name="email" type="email" placeholder="Email" value={email} onChange={handleInputChange} />
                    </div>
                    <div className="signup-input">
                        <i className="bx bx-key" />
                        <input name="password" type="password" placeholder="Password" value={password} onChange={handleInputChange} />
                    </div>
                    <p className="error-message">{error}</p>
                    <button className="button primary" onClick={signup} disabled={loading}>{loading ? 'Loading...' : 'Sing up'}</button>
                </div>
                <div className="login-prompt">
                    <p>Already have an account?</p>
                    <Link to="/">Log in</Link>
                </div>
            </div>  
        </div>
    );
};

export default SignUp;