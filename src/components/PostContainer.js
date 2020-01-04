import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import debounce from 'lodash/debounce';
import ErrorMessage from './ErrorMessage';

const StyledUnorderedList = styled.ul`
    height: auto;
    list-style: none;
    position: relative;
    margin: 40px auto 0;
    width: 100%;
    &::after {
        clear: both;
        content: "";
        display: table;
    }
`

const StyledListItem = styled.li`
    background: #f2efeb;
    float: left;
    margin: 0 0 20px 0;
    position: relative;
    @media (max-width: 625px) {
        width: 100%;
    }
    @media (min-width: 626px) {
        margin: 20px;
        width: calc(50% - 40px);
    }
`

const StyledImageContainer = styled.div`
    display: block;
    height: 0;
    overflow: hidden;
    padding-bottom: 60%;
    position: relative;
    width: 100%;
`

const StyledPostContainer = styled.div`
    background: #fff;
    clear: both;
    line-height: 28px;
    padding: 30px 30px 15px;
`

const StyledImage = styled.img`
    width: 100%;
    max-width: 100%;
`
const StyledHeading = styled.h3`
    font-family: FuturaBT-Heavy,sans-serif;
    font-size: 25px;
    font-weight: 100;
    font-size: 24px;
    height: 100px;
    letter-spacing: -.03em;
    line-height: 32px;
    margin: 10px 0 20px;
`

const PostContainer = ({propState, setPropState}) => {
    const [pageCount, setPageCount] = useState(1);
    const [data, setData] = useState([]);
    const [loadMoreData, setLoadMoreData] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // on page load call JSON Placeholder API 
    useEffect(() => {
        fetchData(pageCount);
    }, []);

    // when load more data value changes, get next 30 results from API
    useEffect(() => {
        fetchData(pageCount);
    }, [loadMoreData]);

    useEffect(() => {
        setErrorMessage('');
    }, [data]);
    
    useEffect(() => {
        window.addEventListener('scroll', debounce(loadMorePosts, 500), true);
    });
    
    const loadMorePosts = () => {
        // if the size of viewport and pixels scrolled vertically are greater than or equal to the height of the document body, toggle the value of the loadMoreData state value so api is called for next 30 results
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setLoadMoreData(!loadMoreData);
        }
    };

    const fetchData = (pageCount) => {
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/photos?_page=${pageCount}&_limit=30`,
        }).then(response => {
            // if API call is successful, spread current data array and spread response data from current API call to keep previous API call results and add new response data
            setData([...data, ...response.data]);
            // increase the page count by 1, so the next API call gets the next 30 results
            setPageCount(pageCount + 1);
            // set state in parent component if its value is false, so the "more posts" text is visible
            if (!propState) {
                setPropState(true);
            }
        }).catch(() => {
            // if there are no API call results, show error message to user
            if (data.length === 0) {
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
                                    <StyledImageContainer>
                                        <StyledImage src={`${post.url}`} alt="" />
                                    </StyledImageContainer>
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
