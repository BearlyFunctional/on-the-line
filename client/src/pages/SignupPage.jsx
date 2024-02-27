import React from 'react';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = ({ history }) => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [addUser, { error, data }] = useMutation(CREATE_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

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
            <h1>
                Signup Page
            </h1>
            <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                    <input
                        className=""
                        placeholder="Your username"
                        name="username"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <input
                        className=""
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        className=""
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
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
            </div>
        </div>
    )
}

export default Signup;