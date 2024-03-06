import React from 'react';

import { useState } from 'react';

import { posts } from '../assets/data';

import Auth from '../utils/auth';

export default function Comments({comments}) {

    // const [{comments}] = posts;

    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [editComment, setEditComment] = useState('');


   

    const handleEdit = (id, initialComment) => {
        setSelectedCommentId(id);
        setEditComment(initialComment);
    };

    const handleSave = () => {
        // Save edited comment logic here
        setSelectedCommentId(null); 
    };

    const handleInputChange = (e) => {
        setEditComment(e.target.value);
    };
   
    return (
        <section className=""> 
            <div>
                
                { Array.isArray(comments) && comments.map(comment => (
                    <div 
                        key={comment.id} 
                        data-id={comment.id} 
                        className='grey-bg border-radius padding comment-section display-flex mb-2 sm-box-shadow'
                        >
                        <div className='text-sm font-semibold'> comment's username:</div>
                        {selectedCommentId === comment.id ? (
                            <textarea 
                                className='border-radius ml-3 mr-3 text-sm'
                                type="text" 
                                name='comment' 
                                value={editComment} 
                                onChange={handleInputChange} />
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
                                            className='border-radius sm-box-shadow mr-4 sm-bt-padding'
                                            > save 
                                        </small>

                                    ) : (
                                        <small 
                                            onClick={() => handleEdit(comment.id, comment.comment)}
                                            className='border-radius sm-box-shadow mr-4 sm-bt-padding'
                                            > edit 
                                        </small>
                                    )}
                                    <small 
                                        className='border-radius sm-box-shadow sm-bt-padding'
                                        > delete
                                    </small>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}