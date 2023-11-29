/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import moment from "moment";
import { AiFillEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductList = ({ product, addProdToCart, removeProdToCart }: any) => {
  const navigate = useNavigate();
  const { cartItem } = useSelector((state: any) => state.product);
  return (
    <Card sx={{ maxWidth: 345, marginBottom: "2rem" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton
            color={
              cartItem.find((item: any) => item.productId === product.id)
                ? "success"
                : "default"
            }
            aria-label="settings"
            onClick={(e) => {
              cartItem.find((item: any) => item.productId === product.id)
                ? removeProdToCart(product)
                : addProdToCart(product);
            }}
          >
            <AiOutlineShoppingCart />
          </IconButton>
        }
        title={product.name}
        subheader={moment(product.createdAt).format("lll")}
      />
      <CardMedia
        component="img"
        height="194"
        image={product.productImage}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        <Rating
          name="read-only"
          value={product.averageRating}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">Cart</IconButton> */}
        <IconButton
          aria-label="share"
          onClick={(e) => navigate(`/products/${product.id}`)}
        >
          <AiFillEye />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default ProductList;
