import React from 'react';

import React from 'react';

import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Posts from '../components/Post';
// import { QUERY_USER_POSTS } from '../utils/queries';

import Auth from '../utils/auth';

export default function MyPostsPage() {

    // const { loading, data } = useQuery(QUERY_USER_POSTS);
    // const posts = data?.posts || [];

    const posts = [] // delete later, this is just so the page loads without error

    return ( 
            <>
                {Auth.loggedIn() ? (
                        <div className='padding-two'>
                            {posts.map((post) => (
                                < Posts post={post} key={post.id} />
                            ))}
                        </div>
                    ) : ( 
                        <div className='place-items-center'>
                            <div>
                                <h1> On The Line </h1>
                            </div>
                            <div className="navigation-links">
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
    ;
}