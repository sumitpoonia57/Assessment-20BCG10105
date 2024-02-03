// Product Card Component

//Misc Imports
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import {
  handleAddToCart,
  handleCurrentProduct,
  handleFetchFavourites,
} from "../store";
import { Heart, ShoppingCart, Star } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.store);
  const navigate = useNavigate();

  //Handle Add to cart
  const addToCart = () => {
    dispatch(handleAddToCart(item.id));
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  //Handle Toggle Favourite
  const toggleFavourite = () => {
    const array = [...store.favourites];
    if (store.favourites.includes(item)) {
      const idx = array.indexOf(item);
      array.splice(idx, 1);
      toast.error("Removed from Favourites", { position: "top-right" });
      dispatch(handleFetchFavourites(array));
    } else {
      array.push(item);
      fetch(
        "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      )
        .then((response) => response.json())
        .catch(() => {});

      toast.success("Added to Favourites", { position: "top-right" });
      dispatch(handleFetchFavourites(array));
    }
  };

  return (
    <Fragment>
      <Card style={{ height: "100%" }}>
        <CardImg
          alt="Card image"
          style={{
            width: "100%",
            height: "30vh",
            objectFit: "contain",
          }}
          onClick={() => {
            dispatch(handleCurrentProduct(item));
            navigate("product");
          }}
          src={item.image}
        />
        <CardBody>
          <CardTitle
            onClick={() => {
              dispatch(handleCurrentProduct(item));
              navigate("product");
            }}
            tag="h6"
          >
            {item.title}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
            onClick={() => {
              dispatch(handleCurrentProduct(item));
              navigate("product");
            }}
          >
            ${item.amount}
          </CardSubtitle>

          <Badge color="success">
            <Star fill="white" size={14} /> <span>{item.rating}</span>
          </Badge>

          <CardText></CardText>
          <div className="d-flex justify-content-between">
            <Button color="link" onClick={() => toggleFavourite()}>
              <Heart
                color="red"
                fill={
                  store &&
                  store.favourites.length &&
                  store.favourites.includes(item)
                    ? "red"
                    : "rgba(0,0,0,0)"
                }
              />
            </Button>
            <Button color="link" onClick={() => addToCart()}>
              <ShoppingCart className="text-secondary" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ProductCard;
