import React from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.div`
    background: #FFF6F6;
    border-radius: 5px;
    box-shadow: 0 0 0 1px #AA92A0 inset, 0 0 0 0 transparent;
    color: #9f3a38;
    padding: 10px 20px;
    max-width: 250px;
    margin: 30px auto 0;
    text-align: center;
    transition: opacity 500ms ease, color 500ms ease, background-color 500ms ease, box-shadow 500ms ease, -webkit-box-shadow 500ms ease;
`

const ErrorMessage = ({children}) => {
    return (
        <StyledErrorMessage role="alert"><p>{children}</p></StyledErrorMessage>
    )
}

export default ErrorMessage;
