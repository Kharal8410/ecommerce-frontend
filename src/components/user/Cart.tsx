/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Container, MenuItem, Select } from "@mui/material";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../Navbar";
import { MdDeleteOutline } from "react-icons/md";
import { removeFromCart } from "../../slice/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { successToast } from "../../services/toaster.service";

const Cart = () => {
  const { cartItem } = useSelector((state: any) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const returnTotalQuantity = () => {
    // let sum = 0;
    // console.log(cartItem);
    // cartItem.forEach((item: any) => {
    //   sum += item.qty;
    // });
    // return sum;

    return cartItem.reduce((acc: any, item: any) => acc + item.qty, 0);
  };

  const returnTotalPrice = () => {
    let sum = 0;
    cartItem.forEach((item: any) => {
      sum += item.qty * item.price;
    });
    return sum;

    // return cartItem.reduce(
    //   (acc: any, item: any) => acc + item.qty * item.price,
    //   0
    // );
  };

  return (
    <>
      <NavbarComponent />
      <Container>
        <Row>
          <Col md={8}>
            <h1 className="text-center mb-2">Shopping Cart</h1>
            {cartItem.length > 0 ? (
              <ListGroup variant="flush">
                {cartItem.map((item: any) => {
                  return (
                    <ListGroup.Item key={item.productId}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={2}>
                          <span>{item.productName}</span>
                        </Col>
                        <Col md={2}>
                          <span>${item.price}</span>
                        </Col>
                        <Col md={2}>
                          <Select
                            value={item.qty}
                            label="Choose quantity"
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                          >
                            {[...Array(item.countInStock)].map((_, index) => {
                              return (
                                <MenuItem key={index + 1} value={index + 1}>
                                  {index + 1}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Col>
                        <Col md={2}>${item.qty * item.price}</Col>
                        {/* <Col md={2}>${item.qty * item.price}</Col> */}
                        <Col md={2}>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              dispatch(removeFromCart(item.productId));
                              successToast(
                                item.productName + " removed from cart"
                              );
                            }}
                          >
                            <MdDeleteOutline />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            ) : (
              <div className="text-center">
                Your cart is empty.{" "}
                <Link to={"/all/products"}>Continue Shopping</Link>
              </div>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <>
                    <b> Total Quantity:</b> {returnTotalQuantity()}{" "}
                    {returnTotalQuantity() == 1 ? "item" : "items"}
                  </>
                </ListGroup.Item>
                <ListGroup.Item>
                  <>
                    <b> Total Price:</b> ${returnTotalPrice()}{" "}
                  </>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={cartItem.length === 0}
                    onClick={() => navigate("/checkout-step")}
                  >
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
