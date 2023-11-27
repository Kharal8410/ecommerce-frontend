/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem, Select } from "@mui/material";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Cart = () => {
  const { cartItem } = useSelector((state: any) => state.product);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
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
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default Cart;
