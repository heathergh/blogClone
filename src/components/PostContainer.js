import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PostContainer = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            fetchData();
            console.log("same height");
        }
    });

    const fetchData = () => {
        try {
            fetch('https://jsonplaceholder.typicode.com/photos?_limit=30')
            .then(request => request.json())
            .then(json => 
                setPosts(json)
            );
        } catch (error) {
            console.error(`uh-oh, something went wrong with the API call: ${error}`);
        }
    };

    return (
        <StyledUnorderedList>
            {
                posts.map(post => {
                    return (
                        <StyledListItem key={post.id}>
                            <div>
                                <StyledHeading>{post.title}</StyledHeading>
                                <StyledImage src={`${post.url}`} alt="" />
                            </div>
                        </StyledListItem>
                    )
                })
            }
        </StyledUnorderedList>
    );
}

const StyledUnorderedList = styled.ul`
    list-style: none;
`

const StyledListItem = styled.li`
    margin: 0 -20px;
    position: relative;
    width: calc(100% + 40px);
`

const StyledImage = styled.img`
    width: 100%;
    max-width: 
`
const StyledHeading = styled.h3`

`

export default PostContainer;