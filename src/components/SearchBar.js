import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 0 0 20px 0;
    &:focus, &:active {
        outline: none;
        border: none;
    }
`

const StyledLabel = styled.label`
    clip-path: inset(100%);
    clip: rect(00 0 0);
    margin: -1px;border: 0;
    position: absolute;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    width: 1px; height: 1px;
`

const StyledInput = styled.input`
    -webkit-transition: all 300ms ease-in-out;
    -moz-transition: all 300ms ease-in-out;
    -ms-transition: all 300ms ease-in-out;
    -o-transition: all 300ms ease-in-out;
    outline: none;
    padding: 20px;
    margin: 20px 0;
    border: 1px solid ;
    border-radius: 8px;
    height: 30px;
    width: 280px;
    &:focus {
        box-shadow: 0 0 5px $focusColor;
        border: 1px solid $focusColor;
    }
    &::placeholder {
        color: $placeholderFontColor;
        font-size: $mobileFontSize;
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
    margin: 0 auto;
`

const Searchbar = () => {
    const [photoId, setPhotoId] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setPhotoId('');
    }, [photoUrl]);

    const searchForImage = event => {
        event.preventDefault();
        
        if (photoId === null || photoId === '') {
            setErrorMessage("Please fill in this field");
        } else {
            axios({
                method: 'get',
                url: `https://jsonplaceholder.typicode.com/photos/${photoId}`,
            }).then(response => {
                setPhotoUrl(response.data.url);
                setErrorMessage('');
            }).catch(error => {
                setErrorMessage('That photo is not available, please try searching for another photo.')
            });
        }
    }
    
    const getUserInput = (event) => {
        event.preventDefault(); 

        if (event.target.value !== '') {
            setPhotoId(event.target.value);
        }
    }

    return (
        <>
            <StyledForm onSubmit={searchForImage}>
                <StyledLabel htmlFor="search">What image do you want to search for?</StyledLabel>
                <StyledInput id="search" value={photoId} onChange={getUserInput} placeholder="Search for an image by ID"/>
            </StyledForm>
            { errorMessage !== '' ?  <ErrorMessage>{errorMessage}</ErrorMessage> : null }
            <StyledImage src={`${photoUrl}`} alt="" />
        </>
    );
}


export default Searchbar;