import React from 'react';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

// import { QUERY_COMMENTS } from '../utils/queries';
// import { EDIT_COMMENT, DELETE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Comments({comments, postId}) {

    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [editComment, setEditComment] = useState('');
    const [onEditMode, setOnEditMode] = useState(false);

    const handleEdit = (id, initialComment) => {
        setSelectedCommentId(id);
        setEditComment(initialComment);
        setOnEditMode(true)
    };

    const handleInputChange = (e) => {
        setEditComment(e.target.value);
    };

    // const [removeComment, {error}] = useMutation(
    //     DELETE_COMMENT, {
    //         refetchQueries: [
    //             QUERY_POSTS, //tentative
    //             'posts'    
    //         ]
    //     }
    // );

    // const handleRemoveComment = async (comment) => {
    //     try {
    //         const { data } = await removeComment({
    //             variables: { 
                        // postId,
                        // selectedCommentedId
    // }
    //         });
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    // const [updateComment, { error } ] = useMutation(EDIT_COMMENT, {
    //     refetchQueries: [
            //not sure what to query 
    //         QUERY_ALL_POSTS,
    //         'posts'
    //     ]
    // });

    const handleEditCommentForm = async (e, commentId) => {
        e.preventDefault();

        try {
            // const { data } = await updateComment({
            //     variables: {
            //         postId,
            //         commentId,
            //         commentBody: editComment // maybe?
            //     }
            // })

            setSelectedCommentId(null);  
            setOnEditMode(false)
        } catch(err) {
            console.log(err)
        }
    };
   
    return (
        <div className=""> 
            <div>
                { Array.isArray(comments) && comments.map(comment => (
                    <div 
                        key={comment._id} 
                        data-id={comment._id} 
                        className='grey-bg border-radius padding comment-section display-flex mb-2 sm-box-shadow'
                        >
                        <p className='text-sm font-semibold pb-2'> 
                            comment's username:
                        </p>
                        {selectedCommentId === comment._id ? (
                            <div className="min-w-0 flex-1"> 
                                <form action="#" className="relative">
                                    <div className="bg-white overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                        <textarea
                                            rows={3}
                                            name="comment"
                                            id="comment"
                                            className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Add your comment..."
                                            value={editComment}
                                            onChange={handleInputChange}
                                        />
                        
                                        {/* Spacer element to match the height of the toolbar */}
                                        <div className="py-2" aria-hidden="true">
                                        {/* Matches height of button in toolbar (1px border + 36px content height) */}
                                            <div className="py-px">
                                                <div className="h-9" />
                                            </div>
                                        </div>
                                    </div>
                        
                                    <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                                        {/* <div className="flex items-center space-x-5">
                                        <div className="flex items-center">
                                            <button
                                            type="button"
                                            className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                                            >
                                            <span className="sr-only">Attach a file</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center"></div>
                                        </div> */}
                                        <div className="flex-shrink-0">
                                            <small 
                                                onClick={handleEditCommentForm}
                                                className='mr-4 sm-bt-padding'
                                                > 
                                                <button className='inline-flex items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' 
                                                        type='submit'>
                                                    Save 
                                                </button>
                                            </small>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className='text-sm p-1 pb-3'>
                                {comment.comment}
                            </div>
                        )}

                        <div className='justify-between'>
                            {Auth.getProfile().data.username === comment.username && (
                                <>
                                    {selectedCommentId === comment._id ? (
                                        <div></div>
                                        ) : (
                                        <small 
                                            onClick={() => handleEdit(comment._id, comment.comment)}
                                            className='mr-4 sm-bt-padding'
                                            > 
                                            <button className='inline-flex items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' 
                                                    type='submit'>
                                                Edit
                                            </button>
                                        </small>
                                    )} 
                                    {onEditMode === true ? ('') : (
                                        <small 
                                            className='sm-bt-padding'
                                            > 
                                            <button 
                                                className='delete-comment inline-flex items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' 
                                                type='submit' 
                                                // onClick={() => handleRemoveComment(comment)}
                                                >
                                                    Delete
                                            </button>
                                        </small>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}