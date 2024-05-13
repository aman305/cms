import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import EditProducts from "./EditProducts";
import { useState, useEffect } from "react";
import { useFirebase } from "../../context/Firebase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddProducts from "./AddProducts";
import Product from "../../utility/Product";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BorderAllRounded, Height, Padding } from "@mui/icons-material";
import DetailPage from "../DetailPage";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  // border: "2px solid #000",
  boxShadow: 24,
  paddingLeft: 5,
  paddingRight: 5,
  border: "none",
  borderRadius: 5,
  paddingBottom: 2,
};

const ProductList: React.FC = () => {
  const firebase = useFirebase();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen: any = () => setOpen(true);
  const handleClose: any = () => setOpen(false);

  const [Editopen, setEditOpen] = useState<boolean>(false);
  const handleEditOpen: any = () => setEditOpen(true);
  const handleEditClose: any = () => setEditOpen(false);

  const [sortByPrice, setSortByPrice] = useState<boolean>(false);
  const [sortByStock, setSortByStock] = useState<boolean>(false);
  const [sortByName, setSortByName] = useState<boolean>(false);

  const [formData, setFormData] = useState<Product | undefined>();

  const navigate = useNavigate();

  const productsDataFetcher = async () => {
    try {
      const snapshot: any = await firebase?.listAllProducts(); // Assuming listProducts() returns a snapshot
      const productsData: any = [];
      if (snapshot) {
        snapshot.forEach((doc: any) => {
          const productData: Product = {
            id: doc.id,
            product: doc.data().product,
            code: doc.data().code,
            price: doc.data().price,
            description: doc.data().description,
            stock: doc.data().stock,
            category: doc.data().category,
          };
          productsData.push(productData);
        });
      }
      setProducts([...productsData]);
      setData([...productsData]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    productsDataFetcher();
  }, []);

  useEffect(() => {
    if (!firebase?.currentUser) {
      navigate("/signin");
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (docId: string) => {
    firebase?.deleteProduct(docId);
    const updatedData = products.filter((p) => p.id !== docId);
    setProducts([...updatedData]);
  };

  const filterData = async (v: any, e: any) => {
    try {
      if (v) {
        const filterProducts = products.filter(
          (product) => product.category === v
        );
        setProducts([...filterProducts]);
      } else if (e.target.value === "" || !v) {
        setProducts([...data]);
      }
    } catch (e) {
      console.log("Error filtering products:", e);
    }
  };

  const handleSubmit = (newProduct: Product) => {
    setProducts([...products, newProduct]);
    handleClose();
  };

  const handleEditSubmit = (docId: string, updatedProduct: Product) => {
    const remainingProduct = products.filter((product) => product.id !== docId);
    remainingProduct.push(updatedProduct);
    setProducts([...remainingProduct]);
  };

  const editData = (
    id: string,
    product: string,
    description: string,
    code: string,
    category: string,
    price: number,
    stock: number
  ) => {
    const data = {
      id: id,
      product: product,
      description: description,
      code: code,
      category: category,
      price: price,
      stock: stock,
    };
    setFormData(data);
    handleEditOpen();
  };

  const sortProductByPrice = () => {
    if (sortByPrice) {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    }
    setSortByPrice(!sortByPrice);
  };

  const sortProductsByStock = () => {
    if (sortByStock) {
      const sortedProduct = [...products].sort((a, b) => a.stock - b.stock);
      setProducts(sortedProduct);
    } else {
      const sortedProduct = [...products].sort((a, b) => b.stock - a.stock);
      setProducts(sortedProduct);
    }
    setSortByStock(!sortByStock);
  };

  const sortProductByName = () => {
    if (sortByName) {
      const sortedProduct = [...products].sort((a, b) => {
        return a.product > b.product ? 1 : -1;
      });
      setProducts(sortedProduct);
    } else {
      const sortedProduct = [...products].sort((a, b) => {
        return b.product > a.product ? 1 : -1;
      });
      setProducts(sortedProduct);
    }
    setSortByName(!sortByName);
  };

  const uniqueCategory = [
    ...new Set(products.map((product) => product.category)),
  ];

  // const detailPage = (product: Product) => {
  //   <DetailPage product={product} />;
  // };

  const detailPageNavigateHandler = (id: string) => {
    navigate(`/detailpage/${id}`);
    console.log(id);
  };

  return (
    <div className="bg-gradient-to-r from-sky-300 to-indigo-300 w-full">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddProducts closeEvent={handleClose} addProduct={handleSubmit} />
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={Editopen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditProducts
              closeEvent={handleEditClose}
              productData={formData}
              updateProduct={handleEditSubmit}
            />
          </Box>
        </Modal>
      </div>

      <Paper
        sx={{
          width: "80%",
          overflow: "hidden",
          margin: "auto",
          marginTop: "20px",
          border: "none",
          borderRadius: "20px",
          padding: "10px",
        }}
        elevation={20}
      >
        <Typography
          variant="h4"
          fontFamily={"sans-serif"}
          fontWeight={"800"}
          sx={{ padding: "20px", textAlign: "left" }}
        >
          Products List
        </Typography>
        <Box height={10} />
        <Stack
          direction="row"
          sx={{ padding: "0px 20px" }}
          spacing={2}
          className="my-2 mb-2"
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={uniqueCategory}
            sx={{ width: 300 }}
            onChange={(e, v) => filterData(v, e)}
            // getOptionLabel={(products) => products.category || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search Products" />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            endIcon={<AddCircleIcon />}
          >
            <Typography sx={{ fontWeight: "800" }}>Add products</Typography>
          </Button>
        </Stack>
        <Box height={10} />
        <Divider />
        <TableContainer sx={{ maxHeight: "100vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "800" }}>Product</Typography>
                    <div onClick={sortProductByName}>
                      <SortByAlphaIcon
                        fontSize="small"
                        sx={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  <Typography sx={{ fontWeight: "800" }}>
                    Description
                  </Typography>
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  <Typography sx={{ fontWeight: "800" }}>Code</Typography>
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  <div
                    onClick={sortProductByPrice}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "800" }}>Price</Typography>
                    <SwapVertIcon sx={{ cursor: "pointer" }} />
                  </div>
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  <div
                    onClick={sortProductsByStock}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "800" }}>Stock</Typography>
                    <SwapVertIcon sx={{ cursor: "pointer" }} />
                  </div>
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  <Typography sx={{ fontWeight: "800" }}>Category</Typography>
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  <Typography sx={{ fontWeight: "800" }}>Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    onClick={() => {
                      detailPageNavigateHandler(product.id);
                    }}
                  >
                    <TableCell align="left">{product.product}</TableCell>
                    <TableCell align="left">
                      <Typography
                        sx={{ cursor: "pointer" }}
                        // onClick={() => detailPage(product)}
                      >
                        {product.description.slice(0, 10) + "..."}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{product.code}</TableCell>
                    <TableCell align="left">{product.price}</TableCell>
                    <TableCell align="left">{product.stock}</TableCell>
                    <TableCell align="left">{product.category}</TableCell>
                    <TableCell align="left">
                      <Stack direction={"row"}>
                        <IconButton
                          onClick={() => {
                            editData(
                              product.id,
                              product.product,
                              product.description,
                              product.code,
                              product.category,
                              product.price,
                              product.stock
                            );
                          }}
                        >
                          <EditIcon color="success" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleDelete(product.id);
                          }}
                        >
                          <DeleteIcon sx={{ color: "crimson" }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                  // ---
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ProductList;
