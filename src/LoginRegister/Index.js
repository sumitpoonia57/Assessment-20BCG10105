// Misc Imports
import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { Card, CardBody, TabContent, TabPane } from "reactstrap";

const LoginRegister = () => {
  //States
  const [active, toggleTab] = useState("1");

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ minHeight: "300px", width: "500px" }}>
        <h2
          className="d-flex align-items-center justify-content-start text-white"
          style={{
            paddingInline: "40px",
            backgroundColor: "#0376ed",
            height: "10vh",
          }}
        >
          Shopkart.
        </h2>
        <CardBody>
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <LoginScreen toggleTab={toggleTab} />
            </TabPane>
            <TabPane tabId="2">
              <RegisterScreen toggleTab={toggleTab} />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginRegister;
