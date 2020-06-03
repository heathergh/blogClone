import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import debounce from 'lodash/debounce';
import ErrorMessage from './ErrorMessage';

const StyledUnorderedList = styled.ul`
    display: grid;
    grid-auto-rows: 300px; 
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 75px;
    list-style: none;
    margin: 40px auto 0;
    width: 100%;
`

const StyledListItem = styled.li`
    background: #f2efeb;
    height: max-content;
    margin: 0 0 20px 0;
    @media (min-width: 626px) {
        margin: 20px;
    }
`

const StyledPostContainer = styled.div`
    background: #fff;
    clear: both;
    line-height: 28px;
    padding: 30px 30px 15px;
`

const StyledImage = styled.img`
    display: block;
    height: 165px;
    object-fit: cover;
    width: 100%;
    max-width: 100%;
`
const StyledHeading = styled.h3`
    font-family: 'FuturaBT-Heavy', sans-serif;
    font-weight: 100;
    font-size: 24px;
    height: 100px;
    letter-spacing: -.03em;
    line-height: 32px;
    margin: 10px 0 20px;
    overflow: hidden;
    position: relative;
    
    &::before {
        background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
        bottom: 0;
        content: "";
        height: 32px;
        position: absolute;
        right: 0;
        width: 50%;
    }    
`

const PostContainer = ({propState, setPropState}) => {
    const [pageCount, setPageCount] = useState(1);
    const [data, setData] = useState([]);
    const [loadMoreData, setLoadMoreData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchData(pageCount);
    }, [loadMoreData]);

    useEffect(() => {
        setErrorMessage('');
    }, [data]);
    
    useEffect(() => {
        window.addEventListener('scroll', debounce(loadMorePosts, 500), true);
    });
    
    // when user reaches bottom of the page, the loadMoreData value updates and API call fetches next 30 posts
    const loadMorePosts = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setLoadMoreData(!loadMoreData);
        }
    };

    const fetchData = (pageCount) => {
        axios({
            method: 'get',
            url: `https://dev.to/api/articles?page=${pageCount}`,
        }).then(response => {
            /*
            If API call is successful, spread current data array and spread response data from current API call to keep previous API call results and add new response data
            */
            setData([...data, ...response.data]);
            // increase the page count by 1, so the next API call gets the next 30 results
            setPageCount(pageCount + 1);
            // set state in parent component if its value is false, so the "more posts" text is visible
            if (!propState) {
                setPropState(true);
            }
        }).catch(() => {
            // if there are no API call results, show error message to user
            if (!data) {
                setErrorMessage('Posts are not available at this time. Please try again later.')
            }
        });
    };

    return (
        <>
            {
                errorMessage
            ?
                <ErrorMessage>{errorMessage}</ErrorMessage>
            :
                <StyledUnorderedList>
                    {
                        data.map(post => {
                            return (
                                <StyledListItem key={post.id}>
                                    <StyledImage src={post.cover_image || post.social_image} alt="" />
                                    <StyledPostContainer>
                                        <StyledHeading>{post.title}</StyledHeading>
                                    </StyledPostContainer>
                                </StyledListItem>
                            )
                        })
                    }
                </StyledUnorderedList>
            }
        </>
    );
}

export default PostContainer;
