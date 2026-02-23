// src/pages/ProductListPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Products</Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductListPage;
