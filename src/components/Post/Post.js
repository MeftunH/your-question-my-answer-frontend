import React, { useState, useEffect, useRef } from "react";
import { ReactDOM } from "react-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Moment from "react-moment";
import "moment-timezone";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Comment from "./../Comment/Comment";
import CommentForm from "./../Comment/CommentForm";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  marginTop: "10px",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { title, text, userId, userName, createdAt, postId,likes } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const isInitialMount = useRef(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
  };
  
  const  checkLikes = () => {
    var likeControl = likes.find(like => like.userId === userId);

    if (likeControl) {
      setIsLiked(true);
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComments();
    }
  }, [commentList]);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <Card sx={{ width: 800, textAlign: "left", marginTop: "10px" }}>
      <CardHeader
        avatar={
          <Link
            style={{ textDecoration: "none", boxShadow: "none", color: "grey" }}
            className="navbar-link"
            to={{ pathname: "/users/" + userId }}
          >
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={title}
        subheader={<Moment format="YYYY/MM/DD HH:mm">{createdAt}</Moment>}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon style={isLiked ? { color: "red" } : null} />
        </IconButton>
        {likeCount}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <AddCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {error
            ? "error"
            : isLoaded
            ? commentList.map((comment) => (
                <Comment
                  userId={1}
                  userName={"USER"}
                  text={comment.text}
                  createdAt={comment.createdAt}
                ></Comment>
              ))
            : "Loading"}
          <CommentForm
            userId={1}
            userName={"USER"}
            postId={postId}
          ></CommentForm>
        </Container>
      </Collapse>
    </Card>
  );
}

export default Post;
