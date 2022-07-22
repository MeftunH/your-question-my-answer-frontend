import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import {
  Button,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";

function CommentForm(props) {
  const { postId, userId, userName } = props;
  const [text, setText] = useState("");

  const saveComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error));
  };

  const handleSubmit = () => {
    saveComment();
  };
  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div>
      <CardContent>
        <OutlinedInput
          id="outlined-adornment-amount"
          multiline
          style={{ width: "100%" }}
          inputProps={{
            maxLength: 250,
            fullWidth: true,
          }}
          startAdornment={
            <InputAdornment position="start">
              <Link
                style={{
                  textDecoration: "none",
                  boxShadow: "none",
                  color: "grey",
                }}
                className="navbar-link"
                to={{ pathname: "/users/" + userId }}
              >
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Send
              </Button>
            </InputAdornment>
          }
          onChange={(i) => handleChange(i.target.value)}
        ></OutlinedInput>
      </CardContent>
    </div>
  );
}

export default CommentForm;
