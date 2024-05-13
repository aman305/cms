import React from "react";
import { Box, Divider, Toolbar, Typography } from "@mui/material";
import ProductList from "./products/ProductList";
import Navbar from "../components/Navbar";
type Props = {};

const Products = (props: Props) => {
  return (
    <div className="m-0">
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Divider />
        <Box
          className="bg-gradient-to-r from-sky-300 to-indigo-300 w-screen px-2 py-16 border-none"
          component="main"
        >
          <ProductList />
        </Box>
      </Box>
    </div>
  );
};

export default Products;
