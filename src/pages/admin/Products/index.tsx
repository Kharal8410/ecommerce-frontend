/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getData } from "../../../services/axios.service";
import Loader from "../../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { errorToast, successToast } from "../../../services/toaster.service";
import { config } from "../../../config";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import ProductFormModel from "../../../components/admin/forms/ProductFormModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Products = () => {
  const [products, setProducts] = useState<any>({});
  const [isSpinning, setIsSpinning] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    category: "",
    productImage: "",
    countInStock: "",
  });
  const [categories, setCategories] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const { jwt } = useSelector((state: any) => state.auth);

  const getProducts = async () => {
    setIsLoading(true);
    const resp = await getData("/product");
    setProducts(resp.data);

    const newCategories = resp.data.results.map((result: any) => {
      return result.category;
    });
    setCategories([...new Set(newCategories)]);
    setIsLoading(false);
  };

  const deleteProduct = async (id: string) => {
    try {
      const resp = await axios.delete(`${config.SERVER_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const deleteHandler = products.results.filter((product: any) => {
        return product.id !== id;
      });

      setProducts((prev: any) => {
        return { ...prev, results: deleteHandler, count: deleteHandler.length };
      });
    } catch (error: any) {
      errorToast(error.response.data.error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

 
  const handleChange=(e: any)=>{
    if(e.target.name=== "productImage"){
      setProduct((prev)=>{
      return{...prev,[e.target.name]:e.target.files[0]}
    });

    }else{
      setProduct((prev)=>{
      return{...prev,[e.target.name]:e.target.value}
    });
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSpinning(true);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("description", product.description);
    formData.append("productImage", product.productImage);
    formData.append("countInStock", product.countInStock);

    try {
      const { data } = await axios.post(
        `${config.SERVER_URL}/product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (data.status === "success") {
        setProducts((prev: any) => {
          return { ...prev, results: [data.data, ...prev.results] };
        });
        successToast("Product added successfully");
        setOpen(false);
        setIsSpinning(false);
      }
    } catch (error: any) {
      errorToast(error.response.data.error);
      setIsSpinning(false);
    }
  };


   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Button
            variant="outline-primary"
            className="m-3"
            onClick={handleClickOpen}
          >
            Add Product
          </Button>
          {products.status === "success" && (
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">Brand</StyledTableCell>
                  <StyledTableCell align="right">Created At</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.results.map((product: any) => {
                  return (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell component="th" scope="row">
                        <img
                          src={product.productImage}
                          width={"100"}
                          height={"50"}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.price}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.category}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.brand}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(product.createdAt).format("YYYY-MM-DD")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button variant="outline-primary">
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          className="ms-2"
                          onClick={(e) => deleteProduct(product.id)}
                        >
                          <AiFillDelete />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          <ProductFormModel
            open={open}
            handleClose={handleClose}
            catogeries={categories}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSpinning={isSpinning}
          />
        </Container>
      )}
    </TableContainer>
  );
};
export default Products;
