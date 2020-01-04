import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 35px 0 30px;
    &:focus, &:active {
        border: none;
        outline: none;
    }
`

const StyledLabel = styled.label`
    border: 0;
    clip: rect(00 0 0);
    clip-path: inset(100%);
    height: 1px;
    margin: -1px;
    position: absolute;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    width: 1px;
`

const StyledInput = styled.input`
    -webkit-transition: all 300ms ease-in-out;
    -moz-transition: all 300ms ease-in-out;
    -ms-transition: all 300ms ease-in-out;
    -o-transition: all 300ms ease-in-out;
    border: 1px solid ;
    border-radius: 8px;
    font-size: 20px;
    height: 20px;
    padding: 10px;
    outline: none;
    width: 280px;
    &:focus {
        border: 1px solid #2e86ab;
        box-shadow: 0 0 5px #2e86ab;
    }
    &::placeholder {
        color: #363636;
    }
    @media (max-width: 625px) {
        width: 500px;
    }
    @media (min-width: 626px) {
        width: 600px;
    }
`

const StyledImage = styled.img`
    display: flex;
    height: 50%;
    margin: 0 auto;
`

const Searchbar = () => {
    const [photoId, setPhotoId] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // clear input when there is a photo URL
    useEffect(() => {
        setPhotoId('');
    }, [photoUrl]);

    const getImageById = event => {
        event.preventDefault();
        
        // remove trailing and leading whitespace from user input before using it in API call
        const trimmedId = photoId.replace(/(^\s+|\s+$)/g,'');

        // if the user did not enter an ID, show error message and remove current image
        if (trimmedId === '') {
            setErrorMessage("Please fill in this field");
            setPhotoUrl('');
        } else {
            axios({
                method: 'get',
                url: `https://jsonplaceholder.typicode.com/photos/${trimmedId}`,
            }).then(response => {
                // if API call is successful, set photo URL value
                setPhotoUrl(response.data.url);

                // clear error message if it exists once API call is successful
                if (errorMessage !== '') {
                    setErrorMessage('');
                }
            }).catch(() => {
                // if there are no results, show an error message to user
                setErrorMessage('That photo is not available, please try searching for another photo.')
                // if there are no results, remove the photo URL so no photo is displayed
                setPhotoUrl('');
            });
        }
    }
    
    // get user input from search bar input and set the photoId value with it
    const getUserInput = (event) => {
        event.preventDefault();

        setPhotoId(event.target.value);
    }

    return (
        <>
            <StyledForm onSubmit={getImageById}>
                <StyledLabel htmlFor="search">What image do you want to search for?</StyledLabel>
                <StyledInput id="search" value={photoId} onChange={getUserInput} placeholder="Search for an image by ID"/>
            </StyledForm>
            { errorMessage ?  <ErrorMessage>{errorMessage}</ErrorMessage> : null }
            <StyledImage src={`${photoUrl}`} alt="" />
        </>
    );
}

export default Searchbar;
