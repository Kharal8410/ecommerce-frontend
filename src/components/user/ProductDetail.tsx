/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../services/axios.service";
import Loader from "../Loader";
import NavbarComponent from "../Navbar";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { Button, InputLabel, MenuItem, Rating, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";

const ProductDetail = () => {
  const [product, setProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    // /product/id
    const getProductById = async () => {
      setIsLoading(true);
      const resp = await getData(`/product/${productId}`);
      setProduct(resp);
      setIsLoading(false);
    };
    getProductById();
  }, []);
  return (
    <>
      <NavbarComponent />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {product.status === "success" && (
            <>
              <Row>
                <Col md={6}>
                  <Image
                    src={product.data.productImage}
                    alt={product.data.name}
                    fluid
                    style={{ height: "50vh", width: "50%" }}
                  />
                </Col>

                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>{product.data.name}</ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        name="read-only"
                        value={product.data.averageRating}
                        precision={0.5}
                        readOnly
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Price:</b> ${product.data.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Description:</b> ${product.data.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price</Col>
                        <Col>
                          <strong>${product.data.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status</Col>
                        <Col>
                          <strong>
                            {product.data.countInStock > 0
                              ? "In stock"
                              : "Out of stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col className="mt-3">Quantity</Col>
                        <Col>
                          <FormControl
                            variant="standard"
                            sx={{ minWidth: 120 }}
                          >
                            <InputLabel id="demo-simple-select-filled-label">
                              Choose Quantity
                            </InputLabel>
                            <Select
                              value=""
                              label="Choose quantity"
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                            >
                              {[...Array(product.data.countInStock)].map(
                                (_, index) => {
                                  return (
                                    <MenuItem key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </MenuItem>
                                  );
                                }
                              )}
                            </Select>
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        variant="contained"
                        fullWidth
                        disabled={product.data.countInStock == 0}
                      >
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetail;
