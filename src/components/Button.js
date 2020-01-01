import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
    return (
        <StyledButton type="button">{props.children}</StyledButton>
    )
}

const StyledButton = styled.button`
    
    width: 180px;
    left: 50%;
`


export default Button;
