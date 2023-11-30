import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function Search() {
  const HoverButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <Button
        type="submit"
        style={{
          backgroundColor: isHovered ? "#333" : "transparent",
          border: "none",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaSearch />
      </Button>
    );
  };

  return (
    <Form className="ms-auto">
      <Row>
        <Col xs="auto">
          <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
        </Col>
        <Col xs="auto">
          <HoverButton />
        </Col>
      </Row>
    </Form>
  );
}

export default Search;
