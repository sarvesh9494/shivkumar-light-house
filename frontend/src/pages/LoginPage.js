import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      alert(res.data.message); // you can replace this with toast or navigate
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
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
          type="password" 
          name="password"
          value={form.password}
          onChange={handleChange}
          fullWidth 
          margin="normal" 
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
