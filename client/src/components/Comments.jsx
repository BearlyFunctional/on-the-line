import React from 'react';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { posts } from '../assets/data';
// import { EDIT_COMMENT, DELETE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Comments({comments}) {

    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [editComment, setEditComment] = useState('');

    // const [removeComment, {error}] = useMutation(DELETE_COMMENT, {
    //     //maybe
    //     refetchQueries: [
    //         QUERY_ALL_POSTS, 
    //         'name-of-function-in-resolvers'
    //     ]
    // });

    // const handleRemoveComment = async (comment) => {
    //     try {
    //         const { data } = await removeComment({
    //             variables: { comment }
    //         });
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    // const [updateComment, { error } ] = useMutation(ADD_COMMENT, {
    //     refetchQueries: [
    //         QUERY_ALL_POSTS,
    //         'name-of-function-in-resolvers'
    //     ]
    // });

    // const handleUpdateComment = async (commentId, updatedComment) => {
    //     try {
    //         const { data } = await editCommentMut({
    //             variables: {
    //                 commentId,
    //                 updatedComment
    //             }
    //         })
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    const handleEdit = (id, initialComment) => {
        setSelectedCommentId(id);
        setEditComment(initialComment);
    };

    const handleSave = () => {
        // Save edited comment logic here
        setSelectedCommentId(null);  // move this in handleUpdateComment
    };

    const handleInputChange = (e) => {
        setEditComment(e.target.value);
    };
   
    return (
        <div className=""> 
            <div>
                
                { Array.isArray(comments) && comments.map(comment => (
                    <div 
                        key={comment.id} 
                        data-id={comment.id} 
                        className='grey-bg border-radius padding comment-section display-flex mb-2 sm-box-shadow'
                        >
                        <div className='text-sm font-semibold'> comment's username:</div>
                        {selectedCommentId === comment.id ? (
                        <div>
                            <div className="p-2 min-w-0 flex-1">
                            <form action="#" className="relative">
                              <div className="bg-white overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                <label htmlFor="comment" className="sr-only">
                                  Add your comment
                                </label>
                                <textarea
                                  rows={3}
                                  name="comment"
                                  id="comment"
                                  className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="Add your comment..."
                                  defaultValue={""}
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
                                  <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    Post
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>


                            // <textarea 
                            //     className='border-radius ml-3 mr-3 text-sm'
                            //     type="text" 
                            //     name='comment' 
                            //     value={editComment} 
                            //     onChange={handleInputChange} />
                        ) : (
                            <div className='text-sm p-1 ml-3'>
                                {comment.comment}
                            </div>
                        )}

                        <div className='justify-between ml-4 '>
                            {Auth.getProfile().data.username === comment.username && (
                                <>
                                    {selectedCommentId === comment.id ? (
                                        <small 
                                            onClick={handleSave}
                                            className='mr-4 sm-bt-padding'
                                            > 
                                            <button className='inline-flex items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' type='submit'>save </button>
                                        </small>

                                    ) : (
                                        <small 
                                            onClick={() => handleEdit(comment.id, comment.comment)}
                                            className='mr-4 sm-bt-padding'
                                            > 
                                            <button className='inline-flex items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' type='submit'>
                                                Edit
                                            </button>
                                        </small>
                                    )}
                                    <small 
                                        className='sm-bt-padding'
                                        > 
                                        <button 
                                            className='inline-flex items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' 
                                            type='submit' // keeping it for the css
                                            // onClick={() => handleRemoveComment(comment)}
                                            >
                                                Delete
                                        </button>
                                    </small>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}