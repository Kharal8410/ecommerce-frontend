/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Col, Row } from "react-bootstrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ButtonSpinner from "../../Loader/Spinnner";

export default function ProductFormModel({
  open,
  handleClose,
  catogeries,
  handleChange,
  handleSubmit,
  isSpinning,
}: any) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Product Form</DialogTitle>
      <DialogContent>
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
            />
          </Col>
        </Row>
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
            />
          </Col>
        </Row>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="outlined" disabled={isSpinning} onClick={handleSubmit}>
          {isSpinning ? <ButtonSpinner /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
