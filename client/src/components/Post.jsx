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
                        <button onClick={toggleComments}>
                            view comments
                        </button>
                        {showComments && (
                            <div>
                                {post.comments}
                            </div>
                        )}
                    </div>
                    ) : ''}
                </h4>
            </div>
        </section>
    )
}