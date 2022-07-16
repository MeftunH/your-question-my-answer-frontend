import React, { useState, useEffect } from "react";
import Post from "./../Post/Post";
import "./Home.scss";
import Container from '@mui/material/Container';

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
  }, []);

  if (error) {
    return <div> Error ...</div>;
  } else if (!isLoaded) {
    return <div> Loading </div>;
  } else {
    return (

        <div fixed 
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {postList.map((post) => (
          <Post userId = {post.userId} userName = {post.userName} title={post.title} text={post.text} createdAt={post.createdAt}></Post>
        ))}
        </div>
    );
  }
}

export default Home;
