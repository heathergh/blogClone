import React from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.div`
    display: flex;
    background: #FFF6F6;
    padding: 5px 10px;
    box-shadow: 0 0 0 1px #AA92A0 inset, 0 0 0 0 transparent;
    transition: opacity 500ms ease, color 500ms ease, background-color 500ms ease, box-shadow 500ms ease, -webkit-box-shadow 500ms ease;
    border-radius: 5px;
    max-width: 250px;
    margin: 0 auto 20px;
    color: #9f3a38;
    text-align: center;
    margin: 0;
`

const ErrorMessage = ({children}) => {
    return (
        <StyledErrorMessage role="alert"><p>{children}</p></StyledErrorMessage>
    )
}

export default ErrorMessage;