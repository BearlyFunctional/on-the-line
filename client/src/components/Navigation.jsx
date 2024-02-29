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
        <div className="navigation-links" >
            <Link to="/"
                  className={location.pathname === '/' ? 'active' : ''}> 
                <button>
                    Home 
                </button>
            </Link>
            {Auth.loggedIn() ? (
                    <>
                        < Link to ="/createPost"
                            className={location.pathname === 'createPost' ? 'active' : ''}>
                            <button>
                                Create Post
                            </button>
                        </Link>
                        < Link to ="/myPosts"
                            className={location.pathname === 'myPosts' ? 'active' : ''}>
                            <button>
                                My Posts
                            </button>
                        </Link>
                        < Link to ="/donate"
                            className={location.pathname === 'donate' ? 'active' : ''}>
                            <button>
                                Donate
                            </button>
                        </Link>
                        <button className="" onClick={logout}>
                            Logout
                        </button>
                    </>
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