import { FormControl, Input, InputLabel } from "@mui/material";
import React from "react";

function Auth() {
  return (
    <FormControl size="large">
      <InputLabel>Username</InputLabel>
      <Input></Input>
      <InputLabel style={{ top: 40 }}>Password</InputLabel>
      <Input style={{ top: 40 }}></Input>
      <Button variant="contained" color="primary" style={{ top: 30 }}> Let Me Register </Button>        
      <Button variant="contained" color="primary" style={{ top: 30 }}> Let Me Register </Button>        
      <Button variant="contained" color="primary" style={{ top: 30 }}> Let Me Register </Button>        
       </FormControl>
  );
}

export default Auth;
