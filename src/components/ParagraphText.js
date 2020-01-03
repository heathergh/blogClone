import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
    background: #ffb21a;
    border-radius: 5px;
    color: #fff;
    font-family: FuturaBT-Book,sans-serif;
    font-size: 20px;
    font-weight: 300;
    margin: 0 auto;
    padding: 16px 20px 15px;
    text-align: center;
    width: 180px;
`

const ParagraphText = (props) => {
    return (
        <StyledParagraph>{props.children}</StyledParagraph>
    )
}

export default ParagraphText;
