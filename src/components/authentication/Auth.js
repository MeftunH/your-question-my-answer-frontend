import { FormControl, Input, InputLabel } from "@mui/material";
import React from "react";

function Auth() {
  return (
    <FormControl size="large">
      <InputLabel>Username</InputLabel>
      <Input></Input>
      <InputLabel style={{ top: 30 }}>Password</InputLabel>
      <Input style={{ top: 30 }}></Input>
    </FormControl>
  );
}

export default Auth;
