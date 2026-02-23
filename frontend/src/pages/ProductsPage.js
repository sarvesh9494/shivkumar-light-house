// src/pages/ProductsPage.js

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error loading products", err);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByCategory = filteredProducts.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
    // You can connect to your actual cart logic here
  };

  const handleBuyNow = (product) => {
    console.log("Buying now:", product.name);
    // You can redirect to checkout or order page here
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: 5 }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Products
        </Typography>

        <Box mb={4}>
          <TextField
            fullWidth
            label="Search products..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {Object.keys(groupedByCategory).map((category) => (
          <Box key={category} sx={{ mb: 5 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                mb: 3,
                borderBottom: "3px solid #c72026",
                display: "inline-block",
              }}
            >
              {category}
            </Typography>
            <Grid container spacing={3}>
              {groupedByCategory[category].map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <Card
                    sx={{
                      height: "100%",
                      transition: "0.3s",
                      "&:hover": { boxShadow: 6, cursor: "pointer" },
                    }}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ height: 200, objectFit: "contain", p: 1 }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ height: 40, overflow: "hidden" }}
                      >
                        {product.description || "No description available."}
                      </Typography>
                      <Typography variant="body1" color="text.primary" mt={1}>
                        ₹{product.price}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={product.rating || 4}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="green" mt={0.5}>
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow(product);
                        }}
                      >
                        Buy Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default ProductsPage;
