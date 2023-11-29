/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Button, Form } from "react-bootstrap";
import { Container, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../../slice/productSlice";

const Shipping = ({ setActiveStep }: any) => {
  const shpData = useSelector((state: any) => state.product.shippingAddress);

  const [shippingData, setShippingData] = useState<any>(shpData);
  const dispatch = useDispatch();

  function handleChange(e: any) {
    const data = {
      ...shippingData,
      [e.target.name]: e.target.value,
    };
    dispatch(setShippingAddress(data));
    setShippingData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setShippingAddress(shippingData));
    setActiveStep(1);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter address"
            type="text"
            className="mt-2"
            name="address"
            value={shpData.address}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Enter City"
            type="text"
            className="mt-2"
            name="city"
            value={shpData.city}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Enter Postal Code"
            type="number"
            className="mt-2"
            name="postalCode"
            value={shpData.postalCode}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Enter Country"
            type="text"
            value={shpData.country}
            className="mt-2"
            name="country"
            onChange={handleChange}
          />
          <Button type="submit" className="mt-2">
            Continue
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Shipping;
