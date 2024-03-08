import React from 'react';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';

const PostForm = () => {

    const [formState, setFormState] = useState({
        // postImage: '',
        altText: '',
        caption: '',
    });

    const [errors, setErrors] = useState('');
    const [altTextError, setAltTextError] = useState('');

    const [ addPost, { error}] = useMutation(CREATE_POST);

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        if (files) {
            setFormState({...formState, [name]: files[0]})
        } else if (name === 'postImage' 
                || name === 'caption'
                || name === 'altText') {
            setFormState({ ...formState, [name]: value });
        }
    };

    const handleAltTextBlur = () => {
        if (!formState.altText) {
            setAltTextError('* alternative text is required');
        } else if (!/^.{20,}$/.test(formState.altText)) {
            setAltTextError('* must contain at least 20 characters');
        } else {
            setAltTextError('');
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // if(!formState.postImage) {
        //     setErrors('* please upload an image');
        //     return;
        // }
    
        try {
            const { data } = await addPost({
                variables: {...formState}
            })
    
            window.location.href = '/'
        } catch (err) {
            console.error(err);
            // maybe add an alert so user can see it too 
        }
    };

    const handleInput = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = Math.min(event.target.scrollHeight, 100) + 'px'; // Set maximum height
    };

    return (
        <>
            <h2 className='text-align-center pt-4 text-lg'> Create New Post</h2>
            <form   className='display-flex padding-two box-shadow mt-5'
                    onSubmit={handleFormSubmit}>
                <label>
                    Upload picture:
                </label>
                <input 
                    className='box-shadow border-radius'
                    type="file"
                    accept='image'
                    name='postImage'
                    onChange={handleChange}>
                </input>
                {formState.postImage && (
                    <img 
                        src={URL.createObjectURL(formState.postImage)} 
                        alt={formState.altText} 
                    />
                )}
                {errors && <p className='error'>{errors}</p>}
                {/* <br /> */}
                <label>Enter image's alternative text:</label>
                <textarea 
                    className='border-radius box-shadow'
                    name="altText"
                    placeholder='alternative text'
                    value={formState.altText}
                    onChange={handleChange}
                    onInput={handleInput}
                    onBlur={handleAltTextBlur}
                    autoCorrect='on'>
                </textarea>
                {altTextError && 
                <p className='error'>{altTextError}</p>}
                {/* <br /> */}
                <label>Enter caption below:</label>
                <textarea 
                    className='border-radius box-shadow'
                    name="caption"
                    placeholder='caption'
                    value={formState.caption}
                    onChange={handleChange}
                    onInput={handleInput}
                    autoCorrect='on'>
                </textarea>
                <br />
                <button className="lt-grey-bg" type='submit'> Create Post</button>
            </form>
        </>
    )
}

export default PostForm;