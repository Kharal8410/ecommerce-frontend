/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CheckoutContext from "./CheckoutContext";

const CheckoutState = ({ children }: any) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <CheckoutContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutState;
