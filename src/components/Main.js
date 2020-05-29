import React, { useState } from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import PostContainer from './PostContainer';
import ParagraphText from './ParagraphText';

const StyledMain = styled.main`
    background: #f9f8f6;
    min-height: 100vh;
    margin: 0 auto;
    max-width: 1260px;
    padding: 0 20px 120px;
`

const Main = () => {    
    const [doPostsExist, setDoPostsExist] = useState(false);

    return (
        <>
            <Reset />
            <StyledMain>
                <PostContainer propState={doPostsExist} setPropState={setDoPostsExist} />
                {/* if blog articles exist, show 'more posts' text */}
                { doPostsExist ? <ParagraphText>More Posts</ParagraphText> : null }
            </StyledMain>
        </>
    );
}

export default Main;
