import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      alert(res.data.message); // Success
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Name" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Password" 
            name="password" 
            type="password" 
            value={form.password} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            sx={{ mt: 2 }}
            fullWidth
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default RegisterPage;
