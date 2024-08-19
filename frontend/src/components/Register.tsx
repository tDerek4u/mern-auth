import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Declare the interface for the form inputs
interface FormInputs {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate(); // renamed 'history' to 'navigate'
  
  // Use the interface for the state type
  const [inputs, setInputs] = useState<FormInputs>({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:4000/api/v1/sign-up", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      });

      // Check if the response was successful
     
        console.log(response.data);
        navigate("/login"); // navigate to the login page
      

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
      <Typography variant="h2">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <Box marginLeft="auto" marginRight="auto" width={300} display="flex" flexDirection="column">
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            placeholder="Name"
            margin="normal"
          />
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
            Register
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Register;
