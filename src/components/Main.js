import React from 'react';
import styled from 'styled-components';
import PostContainer from './PostContainer';
import Button from './Button';

const Main = () => {
    
    
    return (
        <StyledMain>
            <PostContainer />
            <Button>More Posts</Button>
        </StyledMain>
    );
}

const StyledMain = styled.main`
    margin: 0 auto;
    max-width: 1260px;
    padding: 0 20px;
`

export default Main;