import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Declare the interface for the form inputs
interface FormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate(); // renamed 'history' to 'navigate'
  
  // Use the interface for the state type
  const [inputs, setInputs] = useState<FormInputs>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:4000/api/v1/sign-in", {
       
        email: inputs.email,
        password: inputs.password
      });

      // Check if the response was successful
     
        console.log(response.data);
        navigate("/"); // navigate to the login page
      

    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <Typography variant="h2">Sign In</Typography>
      <form onSubmit={handleSubmit}>
        <Box marginLeft="auto" marginRight="auto" width={300} display="flex" flexDirection="column">
          <TextField
            name="email"
            onChange={handleChange}
            type="email"
            value={inputs.email}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            placeholder="Password"
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
