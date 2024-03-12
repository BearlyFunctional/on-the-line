import React from 'react';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';

const PostForm = () => {

    const [formState, setFormState] = useState({
        image: '',
        altText: '',
        caption: '',
    });

    const [errors, setErrors] = useState('');
    const [altTextError, setAltTextError] = useState('');

    const [ createPost, { error}] = useMutation(CREATE_POST);
    if(error) { console.log(error)}

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

        if(!formState.image) {
            setErrors('* please upload an image');
            return;
        }
        
        const formData = new FormData();
        formData.append('image', formState.image)
    
        try {
            const response = await fetch('/post-image-upload', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem("id_token")}`
                },
                body: formData
            });

            if(response.status !== 200 ) {
                throw new Error('image upload failed')
            }

            const uploadResult = await response.json()

            const { data } = await createPost({
                variables: {
                    image: uploadResult.url,
                    caption: formState.caption,
                    altText: formState.altText
                }
            })
            
            window.location.href = '/'
        } catch (err) {
            console.log('i am the error, look at me:')
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
            <form   
                encType='multipart/form-data'
                className='display-flex padding-two box-shadow mt-5'
                onSubmit={handleFormSubmit}>
                <label>
                    Upload picture:
                </label>
                <input 
                    className='box-shadow border-radius'
                    type="file"
                    accept='.png, .jpg, .jpeg, .heic'
                    name='image'
                    onChange={handleChange}>
                </input>
                {formState.image && (
                    <img 
                        className='create-post'
                        src={URL.createObjectURL(formState.image)} 
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