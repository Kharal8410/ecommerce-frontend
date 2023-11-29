/* eslint-disable @typescript-eslint/no-explicit-any */
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addPaymentMethod } from "../../../slice/productSlice";

const PaymentMethod = ({ activeStep, setActiveStep }: any) => {
  const [paymentMethod, setPaymentMethod] = useState<any>("esewa");
  const dipatch = useDispatch();
  function submitHandler(e: any) {
    e.preventDefault();
    dipatch(addPaymentMethod(paymentMethod));
    setActiveStep(2);
  }
  return (
    <>
      <h1 className="mb-4 text-center">Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Select payment
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="esewa"
            name="radio-buttons-group"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="esewa" control={<Radio />} label="Esewa" />
            <FormControlLabel
              value="khalti"
              control={<Radio />}
              label="Khalti"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <Button
          variant="outlined"
          color="success"
          type="submit"
          className="mt-2"
        >
          Continue
        </Button>
        <Button
          variant="outlined"
          color="error"
          className="mt-2 ms-2"
          onClick={(e) => setActiveStep(0)}
        >
          Go back
        </Button>
      </Form>
    </>
  );
};

export default PaymentMethod;
