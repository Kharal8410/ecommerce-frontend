/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/joy/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CardOverflow from "@mui/joy/CardOverflow";
import Button from "@mui/joy/Button";
import { FaCartPlus } from "react-icons/fa";
import Link from "@mui/joy/Link";

const ProductList = ({ product, addProdToCart, removeProdToCart }: any) => {
  const navigate = useNavigate();
  const { cartItem } = useSelector((state: any) => state.product);
  return (
    <Card
      sx={{ maxWidth: 350, marginBottom: "2rem", backgroundColor: "#90EE90" }}
    >
      <CardMedia
        component="img"
        height="194"
        color=""
        image={product.productImage}
        alt={product.name}
      />
      <Link
        color="neutral"
        overlay
        onClick={(e) => navigate(`/products/${product.id}`)}
      >
        <CardHeader
          title={product.name}
          subheader={moment(product.createdAt).format("lll")}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description.slice(0, 35)}
        </Typography>
        <Typography variant="h6" color="text.warning">
          ${product.price}
        </Typography>
        <Rating
          name="read-only"
          value={product.averageRating}
          precision={0.5}
          readOnly
        />
      </CardContent>

      <CardOverflow>
        <Button
          variant="solid"
          color="success"
          size="lg"
          onClick={(e) => {
            cartItem.find((item: any) => item.productId === product.id)
              ? removeProdToCart(product)
              : addProdToCart(product);
          }}
        >
          <FaCartPlus />

          <span className="ms-2">Add to cart</span>
        </Button>
      </CardOverflow>
    </Card>
  );
};
export default ProductList;
