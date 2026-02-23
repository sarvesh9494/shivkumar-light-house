import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

function CategoryProductsPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?category=${encodeURIComponent(category)}`)
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching category products:', err);
        setLoading(false);
      });
  }, [category]);

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', py: 5, minHeight: '100vh' }}>
      <Container>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            borderBottom: '3px solid #c72026',
            display: 'inline-block',
            mb: 4,
            textTransform: 'capitalize',
          }}
        >
          {category}
        </Typography>

        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : products.length === 0 ? (
          <Typography variant="body1">No products found in "{category}".</Typography>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'contain', p: 2, backgroundColor: '#fff' }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'green', mt: 1 }}>
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default CategoryProductsPage;
