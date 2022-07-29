import { FormControl,Input,InputLabel } from '@mui/material'
import React from 'react'

function Auth() {
  return (
    <FormControl>
        <InputLabel>
        Username
        </InputLabel>
        <Input></Input>
        <InputLabel>
        Password
        </InputLabel>
        </FormControl>
  )
}

export default Auth