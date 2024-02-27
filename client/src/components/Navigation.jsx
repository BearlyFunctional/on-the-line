import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import Auth from '../utils/auth';

export default function Navigation() {

    const location = useLocation();
    const logout = (e) => {
        e.preventDefault();
        Auth.logout();
    }

    return (
        <div className="" >
            <Link to="/"
                  className={location.pathname === '/' ? 'active' : ''}> 
                Home 
            </Link>
            {Auth.loggedIn() ? (
                    <button className="" onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" 
                            className={location.pathname === '/login' ? 'active' : ''}> 
                            Login 
                        </Link>
                        <Link to="/signup" 
                            className={location.pathname === '/singup' ? 'active' : ''}> 
                            Singup 
                        </Link>
                    </>
                )
            }
        </div>
    );
}