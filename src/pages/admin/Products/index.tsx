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
import { getData, updateData } from "../../../services/axios.service";
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
import NavbarComponent from "../../../components/Navbar";
import ReactPaginate from "react-paginate";

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

  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const itemsPerPage = 12;

  const [product, setProduct] = useState<any>({
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
  const [edit, setEdit] = useState(false);
  const [originalProduct, setOriginalProduct] = useState<any>({});

  const { jwt } = useSelector((state: any) => state.auth);

  const getProducts = async () => {
    setIsLoading(true);
    const resp = await getData("/product");
    setProducts(resp.data);
    setOriginalProduct(resp.data);
    paginate(resp.data);

    const newCategories = resp.data.results.map((result: any) => {
      return result.category;
    });
    setCategories([...new Set(newCategories)]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (originalProduct.status === "success") {
      paginate(originalProduct);
    }
  }, [itemOffset]);

  function paginate(items: any) {
    const endOffset = itemOffset + itemsPerPage;
    //generate data according to items per page
    const currentItems = items.results.slice(itemOffset, endOffset);

    //calculate total pages
    setPageCount(Math.ceil(items.results.length / itemsPerPage));

    setProducts((prev: any) => {
      return { ...prev, results: currentItems, count: currentItems.length };
    });
  }

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

  const handleChange = (e: any) => {
    if (e.target.name === "productImage") {
      setProduct((prev: any) => {
        return { ...prev, [e.target.name]: e.target.files[0] };
      });
    } else {
      setProduct((prev: any) => {
        return { ...prev, [e.target.name]: e.target.value };
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
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const resp = await updateData(`/product/${product.id}`, product, jwt);

    if (resp.status === "success") {
      const updatedProd = products.results.map((prod: any) => {
        return prod.id === product.id ? resp.data : prod;
      });
      setProducts((prev: any) => {
        return { ...prev, results: updatedProd };
      });
      setOpen(false);
      setEdit(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setProduct({
      name: "",
      brand: "",
      price: "",
      description: "",
      category: "",
      productImage: "",
      countInStock: "",
    });
  };

  interface ProductInterface {
    name: string;
    brand: string;
    category: string;
    price: string;
    description: string;
    productImage: string;
    countInStock: string;
  }

  const editProduct = (product: ProductInterface) => {
    setOpen(true);
    setEdit(true);
    setProduct(product);
  };
  const handlePageChange = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % originalProduct.results.length;
    setItemOffset(newOffset);
  };

  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <NavbarComponent />
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
                        <Button
                          variant="outline-primary"
                          onClick={(e) => editProduct(product)}
                        >
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
            edit={edit}
            product={product}
            handleUpdate={handleUpdate}
          />
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
            />
          )}
        </Container>
      )}
    </TableContainer>
  );
};
export default Products;
