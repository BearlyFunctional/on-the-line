import React from 'react';

import { useState } from "react";

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props, { history }) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    
    const [loginError, setLoginError] = useState('');

    const [login, { error }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
            setLoginError('* incorrect email or password')
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <div>
            <h2 className='text-align-center padding-two'>Login</h2>
            <section className=''>
                <form  className='display-flex padding-two box-shadow'
                    onSubmit={handleFormSubmit}>
                    <label>Email:</label>
                    <input
                        className='box-shadow border-radius'
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                     <label>Password:</label>
                    <input
                        className='box-shadow border-radius'
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    {loginError && 
                        <div className="error">{loginError}</div>}
                    <button
                        className="lt-grey-bg"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Submit
                    </button>
                    {error && (
                    <div className="error">
                        {error.message}
                    </div>
                )}
                </form>
            </section>
        </div>
    );
}

export default Login;