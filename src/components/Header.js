import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    margin: 50px 0 20px;
    text-align: center;
`
const StyledHeadingOne = styled.h1`
    color: #272c2f;
    font-family: 'FuturaBT-Heavy', sans-serif;
    font-size: 45px;
    font-weight: 100;
    line-height: 1.1;    
`

const StyledHeadingTwo = styled.h2`
    font-family: 'FuturaBT-Heavy', sans-serif;
    font-size: 30px;
    font-weight: 100;
    letter-spacing: 2px;
    line-height: 45px;
    opacity: .5;
    margin: 15px 0 0;
`

const Header = () => {
    return (
        <StyledHeader>
            <StyledHeadingOne>DevTO Blog Clone</StyledHeadingOne>
            <StyledHeadingTwo>Stories from the DevTO Community</StyledHeadingTwo>
        </StyledHeader>
    );
}

export default Header;
