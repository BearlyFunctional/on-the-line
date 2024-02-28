import React from 'react';

import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

export default function HomePage () {
    return ( 
        <>
            {Auth.loggedIn() ? (
                    <div>
                        <h1>bienvenue à l'enfer: homepage</h1>
                    </div>
                ) : ( 
                    <div>
                        <div>
                            <h1> On The Line </h1>
                        </div>
                        <div className="login-links">
                            <div>
                                <Link to="/login" 
                                    className={location.pathname === '/login' ? 'active' : ''}> 
                                    <button>
                                        Login 
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/signup" 
                                    className={location.pathname === '/signup' ? 'active' : ''}> 
                                    <button>
                                        Sign up 
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-align-center'>Welcome!</h2>
                        </div>
                    </div>
                )
            }
        </>
    );
}