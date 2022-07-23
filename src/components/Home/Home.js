import React, { useState, useEffect } from "react";
import Post from "./../Post/Post";
import "./Home.scss";
import Container from '@mui/material/Container';
import PostForm from "../Post/PostForm";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {
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
  }

  useEffect(() => {
    refreshPosts();
  }, [postList]);

  if (error) {
    return <div> Error ...</div>;
  } else if (!isLoaded) {
    return <div> Loading </div>;
  } else {
    return (

        <Container
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <PostForm refreshPosts = {refreshPosts} userId = {1} userName = {"ddd"} createdAt={"ddd"}></PostForm>
          {postList.map((post) => (
          <Post likes={post.postLikes} postId={post.id} userId = {post.userId} userName = {post.userName} title={post.title} text={post.text} createdAt={post.createdAt}></Post>
        ))}
        </Container>
    );
  }
}

export default Home;
