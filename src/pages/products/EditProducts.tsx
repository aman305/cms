import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useFirebase } from "../../context/Firebase";
import Product from "../../utility/Product";
import { collection, doc, setDoc } from "firebase/firestore";

type Props = {
  closeEvent: () => void;
  productData: Product | undefined;
  updateProduct: any;
};

const EditProducts: React.FC<Props> = ({
  closeEvent,
  productData,
  updateProduct,
}) => {
  const id = productData?.id ?? "";
  const [product, setProduct] = useState<string>(productData?.product ?? "");
  const [code, setCode] = useState<string>(productData?.code ?? "");
  const [price, setPrice] = useState<number>(productData?.price ?? 0);
  const [description, setDescription] = useState<string>(
    productData?.description ?? ""
  );
  const [category, setCategory] = useState<string>(productData?.category ?? "");
  const [stock, setStock] = useState<number>(productData?.stock ?? 0);

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

  const firebase = useFirebase();
  const handleEditSubmit = async () => {
    const success = await firebase?.updateData(
      id,
      product,
      description,
      code,
      category,
      price,
      stock
    );
    if (success) {
      updateProduct(id, {
        id,
        product,
        description,
        code,
        category,
        price,
        stock,
      });
      console.log("Update successful");
    } else {
      // Update failed
      console.log("Update failed");
    }
    closeEvent();
  };

  return (
    <div style={{ padding: "5px" }}>
      <Box sx={{ m: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: "800" }} align="center">
        Product Details
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon fontSize="large" />
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
            <Button variant="contained" onClick={handleEditSubmit}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditProducts;
