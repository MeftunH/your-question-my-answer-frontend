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
import Container from '@mui/material/Container';

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
  const { title, text, userId, userName, createdAt, postId } = props;
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setLiked(!liked);
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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComments();
    }
  }, [commentList]);

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
          <FavoriteIcon style={liked ? { color: "red" } : null} />
        </IconButton>
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
        <Container  sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          {commentList.map((comment) => (
          <Post userId = {1} userName = {"USER"} text={comment.text} createdAt={comment.createdAt}></Post>
        ))}
        </Container>
      </Collapse>
    </Card>
  );
}

export default Post;
