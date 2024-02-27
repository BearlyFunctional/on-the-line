import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SignInHeader({children}) {
    return (
        <header className="">
            < Link to="/login"
                    className={location.pathname === '/login' ? 'active' : ''}> 
                <button>Login</button> 
            </Link>
            <Link to="/signup"
                  className={location.pathname === '/signup' ? 'active' : ''}>
                <button>Sign Up</button> 
            </Link>
            {children}
        </header>
    );
}