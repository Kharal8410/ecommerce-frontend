/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import axios from "axios";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../../config";
import { errorToast } from "../../../services/toaster.service";
import { createOrder } from "../../../slice/orderSlice";

const CheckoutStep = ({ setActiveStep }: any) => {
  const { cartItem, shippingAddress, paymentMethod } = useSelector(
    (state: any) => state.product
  );
  const { jwt } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
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
  const returnTaxPrice = () => {
    return 0.13 * returnTotalPrice();
  };
  const returnShippingPrice = () => {
    if (returnTotalPrice() >= 50000) {
      return 0;
    } else {
      return 0.01 * returnTotalPrice();
    }

    // return cartItem.reduce(
    //   (acc: any, item: any) => acc + item.qty * item.price,
    //   0
    // );
  };
  const returnActualTotalPrice = () => {
    return returnTotalPrice() + returnTaxPrice() + returnShippingPrice();
  };

  const payWithEsewa = async (e: any) => {
    e.preventDefault();
    const orderData = {
      orderItems: cartItem,
      shipping: shippingAddress,
      payment: { paymentMethod },
      itemsPrice: returnTotalPrice(),
      taxPrice: returnTaxPrice(),
      shippingPrice: returnActualTotalPrice(),
      totalPrice: returnActualTotalPrice(),
    };

    try {
      const { data } = await axios.post(
        `${config.SERVER_URL}/order`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (data.status === "success") {
        dispatch(createOrder(data.data));
        paymentEsewa(data.data);
      }
    } catch (error: any) {
      errorToast(error.response.data.error);
    }
  };

  function paymentEsewa(order: any) {
    let path = "https://uat.esewa.com.np/epay/main";
    let params: any = {
      amt: returnActualTotalPrice(),
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: returnActualTotalPrice(),
      pid: order._id,
      scd: "EPAYTEST",
      su: "http://localhost:5173/payment/success",
      fu: "http://merchant.com.np/page/esewa_payment_failed",
    };
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  }
  return (
    <>
      <Row className="mt-5">
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping:</h2>
              <p>
                Address: {shippingAddress.postalCode}, {shippingAddress.address}
                , {shippingAddress.city}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <p>Method: {paymentMethod.toUpperCase()}</p>
            </ListGroup.Item>
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
                        <span>{item.qty}</span>
                      </Col>
                      <Col md={2}>${item.qty * item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <>
                  <b> Total Quantity:</b> {returnTotalQuantity().toFixed(2)}{" "}
                  {returnTotalQuantity() == 1 ? "item" : "items"}
                </>
              </ListGroup.Item>
              <ListGroup.Item>
                <>
                  <b> Sub Price:</b> ${returnTotalPrice().toFixed(2)}{" "}
                </>
              </ListGroup.Item>
              <ListGroup.Item>
                <>
                  <b> Shipping Price:</b> ${returnShippingPrice().toFixed(2)}
                </>
              </ListGroup.Item>
              <ListGroup.Item>
                <>
                  <b> Tax Price:</b> ${returnTaxPrice().toFixed(2)}
                </>
              </ListGroup.Item>
              <ListGroup.Item>
                <>
                  <b> Total Price:</b> ${returnActualTotalPrice().toFixed(2)}{" "}
                </>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={payWithEsewa}
                  className="mt-2"
                >
                  <img
                    src={
                      "https://play-lh.googleusercontent.com/MRzMmiJAe0-xaEkDKB0MKwv1a3kjDieSfNuaIlRo750_EgqxjRFWKKF7xQyRSb4O95Y"
                    }
                    height={"30px"}
                    alt="e"
                  />
                  esewa
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  className="mt-2 ms-2"
                  onClick={(e) => setActiveStep(1)}
                >
                  Go back
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckoutStep;
