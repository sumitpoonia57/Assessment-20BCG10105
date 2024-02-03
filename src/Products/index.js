// Misc Imports
import React from "react";
import { Col, Row } from "reactstrap";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const Products = () => {
  const store = useSelector((state) => state.store);
  return (
    <div className="mx-2">
      <Row>
        {store.products &&
          store.products.length &&
          store.products.map((prod) => {
            return (
              <Col lg="3" className="my-2" key={prod.id}>
                <ProductCard item={prod} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Products;
