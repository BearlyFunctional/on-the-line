import React from 'react';

import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = ({ history }) => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    })
    
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [addUser, { error, data }] = useMutation(CREATE_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleUsernameBlur = () => {
        if (!formState.username) {
            setUsernameError('* name is required');
        } else {
            setUsernameError('');
        }
    };

    const handleEmailBlur = () => {
        if (!formState.email) {
          setEmailError('* email is required');
        } else if (!/^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})$/.test(formState.email)) {
          setEmailError('* invalid email format');
        } else {
          setEmailError('');
        }
    };

    const handlePasswordBlur = () => {
        if(!formState.password) {
            setPasswordError('* password is required');
        } else if (!/^.{8,}$/.test(formState.password)) {
            setPasswordError('* invalid password, must contain at least 8 characters');
        } else {
            setPasswordError('');
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.createUser.token);
            history.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className='text-align-center'>Signup </h2>
            <section>
                <form onSubmit={handleFormSubmit}>
                <label>Username:</label>
                    <input
                        className=""
                        placeholder="Your username"
                        name="username"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        onBlur={handleUsernameBlur}
                    />
                    {usernameError && 
                        <div className="error">{usernameError}</div>}
                    <label>Email:</label>
                    <input
                        className=""
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        onBlur={handleEmailBlur}
                    />
                    {emailError && 
                        <div className='error'>{emailError}</div>}
                    <label>Password:</label>
                    <input
                        className=""
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                        onBlur={handlePasswordBlur}
                    />
                    {passwordError && 
                        <div className='error'>{passwordError}</div>}
                    <button
                        className=""
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>

                {error && (
                    <div className="">
                        {error.message}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Signup;