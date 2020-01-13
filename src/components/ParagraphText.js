import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
    background: #ffb21a;
    border-radius: 5px;
    bottom: 0;
    color: #4c4c4c;
    font-family: FuturaBT-Book,sans-serif;
    font-size: 20px;
    font-weight: 300;
    left: 50%;
    margin-left: -90px;
    position: absolute;
    padding: 16px 20px 15px;
    text-align: center;
    width: 180px;
`

const StyledParagraphWrapper = styled.div`
    background: linear-gradient(hsla(0,0%,100%,0), #f9f8f6);
    height: 390px;
    margin-top: -400px;
    pointer-events: none;
    position: relative;
    text-align: center;
    z-index: 2;
`

const ParagraphText = (props) => {
    return (
        <StyledParagraphWrapper>
            <StyledParagraph>{props.children}</StyledParagraph>
        </StyledParagraphWrapper>
    )
}

export default ParagraphText;
