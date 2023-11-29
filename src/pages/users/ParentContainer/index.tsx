/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from "react-bootstrap";
import NavbarComponent from "../../../components/Navbar";
import CheckoutSteps from "../../../components/user/CheckoutSteps";
import { useContext } from "react";
import CheckoutContext from "../../../context/CheckoutContext";
import Shipping from "../Shipping";
import PaymentMethod from "../PaymentMethod";

const ParentContainer = () => {
  const { activeStep, setActiveStep }: any = useContext(CheckoutContext);

  return (
    <>
      <NavbarComponent />
      <Container>
        <CheckoutSteps activeStep={activeStep} setActiveStep={setActiveStep} />
        {activeStep === 0 && <Shipping setActiveStep={setActiveStep} />}
        {activeStep === 1 && <PaymentMethod />}
      </Container>
    </>
  );
};

export default ParentContainer;
