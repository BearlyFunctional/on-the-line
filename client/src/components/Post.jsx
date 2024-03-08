import React from 'react';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Comments from './Comments';
import CommentForm from './CommentForm';
import CaptionForm from './CaptionForm';

import { QUERY_POSTS } from '../utils/queries';
import { DELETE_POST } from '../utils/mutations';

import Auth from '../utils/auth';

export default function Posts({post}) {

    const {comments} = post
    const postId = post._id
    // const commentId = comments[0]?._id || []

    // console.log(commentId)

    console.log(post)
    console.log(comments)
    
    const [showComments, setShowComments] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const toggleCaption = () => {
        setEditMode(!editMode);
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const [deletePost, {error}] = useMutation(
        DELETE_POST, {
            refetchQueries: [
                QUERY_POSTS, //tentative
                   
            ]
        }
    );

    if(error) console.log(error)

    const handleDeletePost = async() => {
       try {
            const { data } = await deletePost({
                variables: { 
                    _id: postId,
            }
            });
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <section className="box-shadow mb-5" key={post._id} data-id={post._id}> 
            <div className=" p-4">
                <div className="bg-white border rounded-sm max-w-md">
                    <div className="flex items-center px-4 py-2 justify-between">
                        {/* <img className="h-8 w-8 rounded-full" src="https://picsum.photos/id/1027/150/150"/> */}
                        <div className="ml-3 ">
                            <span className="text-base font-semibold antialiased block leading-tight">{post.user.username}'s post</span>
                            {/* <span className="text-gray-600 text-xs block">Asheville, North Carolina</span> */}
                        </div>
                        {Auth.getProfile().data.username === post.user.username && (
                            <main className="text-zinc-700 flex items-center justify-center">
                                <button
                                  className="relative group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-lg border">
                                    <span>
                                        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                            <circle cx="15" cy="25" r="4" fill="black" />
                                            <circle cx="25" cy="25" r="4" fill="black" />
                                            <circle cx="35" cy="25" r="4" fill="black" />
                                        </svg>
                                    </span>
                                    <div
                                        className="absolute shadow-lg -bottom-24 right-0 h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2 w-20">
                                        <span className="flex flex-row gap-1 items-center hover:bg-zinc-100 p-1 rounded-lg">
                                            <p
                                            onClick={toggleCaption}>Edit</p>
                                        </span>
                                        <span 
                                            onClick={handleDeletePost}
                                            className="flex flex-row gap-1 items-center hover:bg-zinc-100 p-1 rounded-lg">
                                            <p>Delete</p>
                                    </span>
                                  </div>
                                </button>
                            </main>
                        )}
                    </div>
                    <div className=''>
                        <img src={post.image} alt={post.altText} />
                    </div>
                    {editMode ? (
                        < CaptionForm postId={post._id} setEditMode={setEditMode} post={post} key={post._id}/>
                    ) : (
                        <div className="font-semibold text-base mx-4 mt-2 mb-4">
                            <h3>{post.caption ? post.caption : ''}</h3>
                        </div>
                    )}
                    <div className="flex items-center mx-4 mt-2 mb-2">
                        <div className="w-full ">
                            {/* <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg> */}
                            {/* <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg> */}
                            <svg className='comments-logo' onClick={toggleComments} fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                <path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path>
                            </svg>

                            { showComments && ( 
                                <div>
                                    < Comments comments={comments} postId={post._id} />
                                    < CommentForm postId={post._id} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}