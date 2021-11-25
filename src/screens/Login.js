import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import flixerApi from '../api/flixerApi';
import { setToken } from '../store/slices/authSlice';
import { validateEmail } from '../util/validators';
import store from '../store/store';

import './Login.css';

const Login = () => {
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { email, password } = loginForm;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    const validFields = () => {
        const setValidationError = (errorMessage) => {
            setError(errorMessage);
            return false;
        };

        setError(null);
        if (!email) return setValidationError('Please provide an email');
        if (!validateEmail(email)) setValidationError('Please provide a valid email');
        if (!password) return setValidationError('Please provide a password');
        return true;
    };

    const login = async () => {
        if (validFields()) {
            try {
                setLoading(true);
                const response = await flixerApi.post('/signin', {email, password});
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
        <div className="login-screen">
            <div className="login-container">
                <h1 className="title"><i className="bx bxs-movie"/> Flixer</h1>
                <div className="login-form">
                    <h2>Log in</h2>
                    <p>Log in to view your movie lists</p>
                    <div className="login-input">
                        <i className="bx bxs-envelope" />
                        <input name="email" type="email" placeholder="Email" value={email} onChange={handleInputChange} />
                    </div>
                    <div className="login-input">
                        <i className="bx bx-key" />
                        <input name="password" type="password" placeholder="Password" value={password} onChange={handleInputChange} />
                    </div>
                    <p className="error-message">{error}</p>
                    <button className="button primary" onClick={login} disabled={loading}>{loading ? 'Loading...' : 'Log in'}</button>
                </div>
                <div className="singup-prompt">
                    <p>Don't have an account yet?</p>
                    <Link to="/signup">Sing up</Link>
                </div>
            </div>  
        </div>
    );
};

export default Login;