import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Typography, Grid, Box,
  TextField, MenuItem, FormControl, Select, InputLabel
} from '@mui/material';
import ProductCard from '../components/ProductCard';

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products?category=${encodeURIComponent(category)}`)
      .then(res => {
        setProducts(res.data || []);
        setFilteredProducts(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    let updated = [...products];

    if (searchQuery) {
      updated = updated.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortType === 'price') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortType === 'name') {
      updated.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(updated);
  }, [searchQuery, sortType, products]);

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', py: 4 }}>
      <Container>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            borderBottom: '3px solid #c72026',
            display: 'inline-block',
            mb: 3
          }}
        >
          {category}
        </Typography>

        {/* Search and Sort Controls */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            label="Search by name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <FormControl size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortType}
              label="Sort By"
              onChange={(e) => setSortType(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : filteredProducts.length === 0 ? (
          <Typography variant="body1">No products found.</Typography>
        ) : (
          <Grid container spacing={4}>
            {filteredProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default CategoryPage;
