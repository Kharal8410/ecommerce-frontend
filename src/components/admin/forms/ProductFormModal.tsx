/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Col, Row, Form, Image } from "react-bootstrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ButtonSpinner from "../../Loader/Spinnner";

export default function ProductFormModel({
  open,
  handleClose,
  catogeries,
  handleChange,
  handleSubmit,
  isSpinning,
  edit,
  product,
  handleUpdate,
}: any) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {edit ? "Update Product Form" : "Add Product Form"}
      </DialogTitle>
      <DialogContent>
        {edit && (
          <Row className="mb-2">
            <Col md={6}>
              <Form.Label>Product Image</Form.Label>
              <br />
              <Image src={product.productImage} width={"100"} height={"100"} />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Product Name"
              type="text"
              fullWidth
              variant="standard"
              required
              onChange={handleChange}
              value={product.name}
            />
          </Col>
          <Col>
            <TextField
              autoFocus
              margin="dense"
              id="brand"
              name="brand"
              label="Product Brand"
              type="text"
              fullWidth
              variant="standard"
              required
              onChange={handleChange}
              value={product.brand}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              autoFocus
              margin="dense"
              id="price"
              name="price"
              label="Product Price"
              type="text"
              fullWidth
              variant="standard"
              required
              onChange={handleChange}
              value={product.price}
            />
          </Col>
          <Col>
            <TextField
              autoFocus
              margin="dense"
              id="countInStock"
              name="countInStock"
              label="Product Stock"
              type="text"
              fullWidth
              variant="standard"
              required
              onChange={handleChange}
              value={product.countInStock}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel> Category </InputLabel>
              <Select
                label="category"
                name="category"
                required
                onChange={handleChange}
                value={product.category}
              >
                {catogeries.map((category: any) => {
                  return (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Col>
          <Col>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Product Description"
              type="text"
              fullWidth
              variant="standard"
              required
              onChange={handleChange}
              value={product.description}
            />
          </Col>
        </Row>
        {!edit && (
          <Row>
            <Col>
              <TextField
                type="file"
                margin="normal"
                id="file"
                name="productImage"
                fullWidth
                variant="standard"
                required
                onChange={handleChange}
                // value={product.description}
              />
            </Col>
          </Row>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="outlined"
          disabled={isSpinning}
          onClick={edit ? handleUpdate : handleSubmit}
        >
          {isSpinning ? <ButtonSpinner /> : edit ? "update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
