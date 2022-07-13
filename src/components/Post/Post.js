import React, { useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Moment from 'react-moment';
import 'moment-timezone';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    marginTop: '10px',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  

function Post(props) {
 const {title,text,userId,userName,createdAt} = props;
 const [expanded, setExpanded] = React.useState(false);

 const handleExpandClick = () => {
   setExpanded(!expanded);
 };

 return(
    <Card sx={{ width: 800,
                textAlign: 'left',
                marginTop: "6px",
    }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {userName.charAt(0).toUpperCase()}
        </Avatar>
      }
      title={title}
      subheader= {<Moment format="YYYY/MM/DD HH:mm">{createdAt}</Moment>}
    />

    <CardContent>
      <Typography variant="body2" color="text.secondary">
       {text}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
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
      <CardContent>
      </CardContent>
    </Collapse>
  </Card>
 )

}

export default Post;
