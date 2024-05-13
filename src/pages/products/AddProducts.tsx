import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useFirebase } from "../../context/Firebase";
import Product from "../../utility/Product";

type Props = {
  closeEvent: () => void;
  addProduct: (newProduct: Product) => void;
};

const AddProducts: React.FC<Props> = ({ closeEvent, addProduct }) => {
  const [product, setProduct] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const firebase = useFirebase();
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct(e.target.value);
  };
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStock(parseInt(e.target.value));
  };

  const handleSubmit = async () => {
    await firebase?.addProduct(
      product,
      description,
      price,
      stock,
      code,
      category
    );
    const id = "";
    const newProduct = {
      id,
      product,
      description,
      price,
      stock,
      code,
      category,
    };
    await firebase?.listAllProducts();
    addProduct({ ...newProduct });
    closeEvent();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  // upload image
  return (
    <>
      <Box sx={{ m: 2, background: "red" }} />
      <Typography variant="h4" sx={{ fontWeight: "800" }} align="center">
        Add products
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={30} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={product}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            size="small"
            type="number"
            sx={{ minWidth: "100%" }}
            value={price}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
            onChange={handlePriceChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Stock"
            variant="outlined"
            size="small"
            type="number"
            sx={{ minWidth: "100%" }}
            value={stock}
            onChange={handleStockChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={category}
            onChange={handleCategoryChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Serial-Code"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={code}
            onChange={handleCodeChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            sx={{ minWidth: "100%" }}
            value={description}
            onChange={handleDescriptionChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default AddProducts;
