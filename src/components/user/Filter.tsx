/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Filter = ({ categories, handleSort, handleFilters, sort }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            width: "25%",
          },
        }}
      >
        <Typography>
          <h6>Sort by</h6>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value="name"
                checked={sort.includes("name")}
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value="price"
                checked={sort.includes("price")}
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Price"
          />

          <FormControl variant="outlined" className="mt-2 w-100 h-75">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              onChange={(e) => handleFilters("category", e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {categories.map((category: string) => {
                return (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Typography>
      </Popover>
    </div>
  );
};

export default Filter;
