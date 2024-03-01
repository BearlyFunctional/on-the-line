import React from 'react';

import { useState } from 'react';

import Auth from '../utils/auth';

export default function Posts({post}) {

    const [showComments, setShowComments] = useState(false);
    
    const toggleComments = () => {
        setShowComments(!showComments);
    };

    console.log(Auth.getProfile())
    console.log(Auth.getProfile().data.username)

    return (
        <section className="" key={post.id} data-id={post.id}> 
            <div>
                <h3 className="">{Auth.getProfile().data.username}'s post</h3>
            </div>
            <div className="image-container">
                <img src={post.image} alt={post.alt} className='box-shadow border-radius' ></img>
            </div>
            <div className="">
                <p>{post.caption ? post.caption : ''}</p>
                <h4>{post.comments ? ( 
                    <div>
                        // add a conditional statement that enables user to only edit/delete their own posts - for the homepage
                        <button onClick={toggleComments}>
                            view comments
                        </button>
                        {showComments && (
                            <div>
                                <div>
                                    {post.comments}
                                </div>
                                <button>
                                    edit
                                </button>
                                <button>
                                    delete
                                </button>
                            </div>
                        )}
                        <button>
                            edit post
                        </button>
                        <button>
                            delete post
                        </button>
                    </div>
                    ) : ''}
                </h4>
            </div>
        </section>
    )
}