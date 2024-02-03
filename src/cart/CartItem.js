// Misc imports
import React from "react";
import { Delete, Trash, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardImg, Col, Row } from "reactstrap";
import { handleAdjustQuantity, handleRemoveFromCart } from "../store";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    item.quantity > 0 &&
    <Card className="mb-2">
      <CardBody>
        <Row>
          <Col sm="4">
            <CardImg
              alt="Card image"
              style={{
                width: "100%",
                height: "20vh",
                objectFit: "cover",
              }}
              src={item.image}
            />
          </Col>
          <Col sm="6">
            <h4 className="mb-2">{item.title}</h4>
            <p>${item.amount}</p>
            <p>
              <Button
                color="primary"
                outline
                disabled={item.quantity === 0} // Disable button when quantity is 0
                onClick={() =>
                  dispatch(
                    handleAdjustQuantity({
                      id: item.id,
                      quantity: item.quantity - 1, // Decreasing the Quantity by 1
                    })
                  )
                }
              >
                -
              </Button>
              <span className="mx-3">{item.quantity}</span>
              <Button
                color="primary"
                outline
                onClick={() =>
                  dispatch(
                    handleAdjustQuantity({
                      id: item.id,
                      quantity: item.quantity + 1, // Increasing the Quantity by 1
                    })
                  )
                }
              >
                +
              </Button>
            </p>
          </Col>
          <Col className="d-flex justify-content-center  align-items-center">
            <Button color="link">
              <Trash2
                className="text-danger"
                onClick={() => {
                  return item.quantity > 1
                    ? dispatch(
                        handleAdjustQuantity({
                          id: item.id,
                          quantity: item.quantity - 1, // Reducing the Quantity by 1 if quantity is greater than 1
                        })
                      )
                    : null;
                }}
              />
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default CartItem;
