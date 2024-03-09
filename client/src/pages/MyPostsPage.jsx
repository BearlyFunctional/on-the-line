import React from 'react';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useQuery } from '@apollo/client';

import Posts from '../components/Post';
import { QUERY_POSTS } from '../utils/queries';

import Auth from '../utils/auth';

export default function MyPostsPage() {

    const [page, setPage] = useState(1)

    const { loading, data } = useQuery
        (QUERY_POSTS, {
            variables: {
                userId: Auth.getProfile().data._id,
                page
            }
        }
    );

    const posts = data?.posts.docs || [];

    if (loading) return <h2>loading...</h2>

    return ( 
            <>
                {Auth.loggedIn() ? (
                        <div className='padding-two'>
                            {posts.map((post) => (
                                <div key={post._id}>
                                    < Posts post={post} key={post._id} />
                                </div>
                            ))}
                            < ReactPaginate 
                                className='justify-between flex'
                                pageCount={data?.posts.totalPages || 0 } 
                                onPageChange={(newPage)=> {setPage(newPage.selected + 1 )} }
                            />
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