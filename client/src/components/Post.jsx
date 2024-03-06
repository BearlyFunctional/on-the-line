import React from 'react';

import { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';

import Comments from './Comments';

import { posts } from '../assets/data';
// import { EDIT_POST, DELETE_POST, CREATE_COMMENT } from '../utils/mutations';

import Auth from '../utils/auth';

export default function Posts({post}) {

    // const comments = comments?.posts || [];

    // const [addComment, { error }] = useMutation(CREATE_COMMENT);
    // const [updateCaption, { error }] = useMutation(EDIT_POST, {
        // refetchQueries: [
            // QUERY_ALL_POSTS,
            // 'name-of-functions-in-resolvers'
        // ]
    // });

    const {comments} = post
    console.log(post)

    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedCaption, setEditedCaption] = useState(post.caption || '');

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSaveCaptionChanges = async () => {
        // Save changes logic here
        // For example, call a mutation to update the post caption
        setEditMode(false); // Exit edit mode
    };

    const handleCaptionChange = (e) => {
        setEditedCaption(e.target.value);
    };

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const { data } = await addComment({
    //             variables: {
    //                 postId: post.id, //maybe
    //                 content,
    //                 username: Auth.getProfile().data.username,
    //             }
    //         });

    //         setCommentText('');
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    const handleCommentChange = (e) => {
        const { name, value } = e.target;

        if(name === 'commentText') {
            setCommentText(value);
        }
    }

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    console.log(Auth.getProfile().data.username)
    

    return (
        <section className="box-shadow mb-5" key={post.id} data-id={post.id}> 
            <div className=" p-4">
                <div className="bg-white border rounded-sm max-w-md">
                    <div className="flex items-center px-4 py-2 justify-between">
                    {/* <img className="h-8 w-8 rounded-full" src="https://picsum.photos/id/1027/150/150"/> */}
                        <div className="ml-3 ">
                            <span className="text-base font-semibold antialiased block leading-tight">{Auth.getProfile().data.username}'s post</span>
                            {/* <span className="text-gray-600 text-xs block">Asheville, North Carolina</span> */}
                        </div>
                        {Auth.getProfile().data.username === post.username && (
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
                                        className="absolute shadow-lg -bottom-24 right-0 w-full h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2 w-20">
                                        <span className="flex flex-row gap-1 items-center hover:bg-zinc-100 p-1 rounded-lg">
                                            <p
                                            onClick={handleEditToggle}>Edit</p>
                                        </span>
                                        <span className="flex flex-row gap-1 items-center hover:bg-zinc-100 p-1 rounded-lg">
                                            <p>Delete</p>
                                    </span>
                                  </div>
                                </button>
                            </main>
                        )}
                    </div>
                    <div className=''>
                        <img src={post.image} alt={post.alt} />
                    </div>
                    {editMode ? (
                        <div className=' p-2 grey-bg border-radius font-semibold text-base mx-4 mt-2 mb-4'>
                            <textarea
                                className='w-full border-radius'
                                name="captionText"
                                value={editedCaption}
                                onChange={handleCaptionChange}
                                >
                            </textarea>
                            <button type='submit'> save</button>
                        </div>
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
                                    < Comments comments={comments} key={comments.id}/>
                                    <form className='text-sm grey-bg flex border-radius sm-box-shadow mt-5'>
                                        <div className='flex-col w-full'> 
                                            <p className='font-semibold ml-3'>add comment:</p>
                                            <div className="flex items-start space-x-4">
       
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
                                            {/* <textarea 
                                                className='ml-4 border-radius w-full'
                                                name='commentText'
                                                type="text"
                                                value={commentText}
                                                onChange={handleCommentChange}>
                                            </textarea>
                                            <small className='border-radius sm-box-shadow ml-4 sm-bt-padding'>
                                                <button type='submit'>
                                                    post comment
                                                </button>
                                            </small> */}
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}