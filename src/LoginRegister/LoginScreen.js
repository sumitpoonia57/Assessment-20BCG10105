import React from "react";
import { Button, Col, FormFeedback, Input, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

const LoginScreen = ({ toggleTab }) => {
  const navigate = useNavigate();
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const response = await fetch("http://localhost:5000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const userData = await response.json();

      if (userData.length === 0) {
        // Display an alert if user data is not found
        alert("User not found. Please check your credentials.");
      } else {
        // If user data is found, navigate to the "products" page
        navigate("products");
      }
    } catch (error) {
      // Display an alert for any other errors
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="mx-4 mb-4">Login</h2>
      <Row className="m-3">
        <Col>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email!",
              },
            }}
            render={({ field }) => (
              <Input
                placeholder="Enter email"
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          {errors && errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Controller
            id="password"
            name="password"
            rules={{
              required: "Please enter your password",
            }}
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                placeholder="Enter Password"
                {...field}
                invalid={errors.password && true}
              ></Input>
            )}
          />
          {errors.password ? (
            <FormFeedback> {errors.password.message} </FormFeedback>
          ) : null}
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Button color="link" className="p-0" outline>
            <small onClick={() => toggleTab("2")} className="text-primary">
              New User? Create an Account
            </small>
          </Button>
        </Col>
        <Col>
          <Button
            color="primary"
            className="px-3"
            style={{ width: "100%", borderRadius: "500px" }}
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginScreen;
