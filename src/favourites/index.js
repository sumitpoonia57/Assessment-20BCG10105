// Misc Imports
import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import ProductCard from "../Products/ProductCard";
import { useSelector } from "react-redux";

const Favourites = () => {
  const store = useSelector((state) => state.store); // Redux Store
  return (
    <div className="mx-2">
      {store.favourites && store.favourites.length ? (
        <Row>
          {store.favourites.map((prod) => {
            return (
              <Col lg="3" className="my-2">
                <ProductCard item={prod} />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Card style={{ height: "387px" }}>
          <CardBody className="d-flex justify-content-center  align-items-center">
            <h5 className="text-secondary">
              Your Favourites selection is empty! Try adding more products to
              favourites by clicking on products tab...
            </h5>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Favourites;
