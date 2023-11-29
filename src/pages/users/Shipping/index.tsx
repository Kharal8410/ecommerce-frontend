/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Button, Form } from "react-bootstrap";
import { Container, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setShippingAddress } from "../../../slice/productSlice";

const Shipping = ({ setActiveStep }: any) => {
  const [shippingData, setShippingData] = useState<any>({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const dispatch = useDispatch();

  function handleChange(e: any) {
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
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Enter City"
            type="text"
            className="mt-2"
            name="city"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Enter Postal Code"
            type="number"
            className="mt-2"
            name="postalCode"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Enter Country"
            type="text"
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
