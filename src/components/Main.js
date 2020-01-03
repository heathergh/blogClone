import React from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import SearchBar from './SearchBar';
import PostContainer from './PostContainer';
import ParagraphText from './ParagraphText';

const StyledMain = styled.main`
    background: #f2efeb;
    height: 100%;
    margin: 0 auto;
    min-height: 100vh;
    max-width: 1260px;
    padding: 0 20px;
`

const Main = () => {    
    return (
        <>
            <Reset />
            <StyledMain>
                <SearchBar />
                <PostContainer /> 
                <ParagraphText>More Posts</ParagraphText>
            </StyledMain>
        </>
    );
}

export default Main;
