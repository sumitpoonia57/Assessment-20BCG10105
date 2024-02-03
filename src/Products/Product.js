// Product Details Screen

// Misc Imports
import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "react-feather";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardImg, Col, Row } from "reactstrap";
import Swal from "sweetalert2";
import { handleAddToCart, handleFetchFavourites } from "../store";

const Product = () => {
  //defining store and dispatch
  const store = useSelector((state) => state.store);
  const dispatch = useDispatch();
 // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // Handle Add to cart
  const addToCart = () => {
    dispatch(handleAddToCart(item.id));
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Handle Toggle Favourite
  const toggleFavourite = () => {
    const array = [...store.favourites];
    if (store.favourites.includes(item)) {
      const idx = array.indexOf(item);
      array.splice(idx, 1);
      toast.error("Removed from Favourites", { position: "top-right" });
      dispatch(handleFetchFavourites(array));
    } else {
      array.push(item);

      //Post call to update Favourites
      fetch(
        "http://localhost:5000/favourites/",
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
  const [item, setItem] = useState({});
  useEffect(() => {
    setItem(store.currentProduct);
  }, [store.currentProduct]);

  return (
    <Card>
      <CardBody>
        <Row style={{ height: "90vh" }}>
          <Col sm="12" lg="6" className="m-4 p-4 pe-0 me-0">
            <CardImg
              alt="Card image"
              style={{
                width: "100%",
                height: "70vh",
                objectFit: "scale-down",
              }}
              src={item.image}
            />
          </Col>
          <Col className="m-4 p-4">
            <hr className="my-4" />
            <h2>{item.title}</h2>
            <hr className="my-4" />
            <p className="mb-5 text-secondary">{item.description}</p>
            <h5 className="mb-5 text-success">
              Get this now for only ${item.amount}
            </h5>

            <Row>
              <Col>
                <Button
                  style={{ width: "100%" }}
                  color="primary"
                  onClick={() => {
                    addToCart();
                  }}
                >
                  Add To Cart{" "}
                  <ShoppingCart
                    size="16"
                    className="ms-2 mb-1 text-white"
                    // color="blue"
                    fill="white"
                  />
                </Button>
              </Col>
              <Col>
                <Button
                  style={{ width: "100%" }}
                  color="danger"
                  onClick={() => toggleFavourite()}
                >
                  {!store.favourites.includes(item)
                    ? "Add To Favourites"
                    : "Remove from favourites"}{" "}
                  <Heart
                    size="18"
                    fill="white"
                    className="ms-2 mb-1 text-white"
                  />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Product;
