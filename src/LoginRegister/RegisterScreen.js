//Register Tab

//Misc imports
import React from "react";
import { Button, Col, Input, Row } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const RegisterScreen = ({ toggleTab }) => {
  const navigate = useNavigate();

  // React hook Form for form validation
  const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repassword: "",
  };
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    const payload = {};
    payload.email = data.email;
    payload.password = data.password;
    payload.firstName = data.firstName;
    payload.lastName = data.lastName;

    // Post call for User Sign up
    fetch(
      "http://localhost:5000/users/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .catch((response) => toast.error(response))
      .then(() => navigate("product"));
  };

  return (
    <div>
      <h2 className="mx-4  mb-4">Register</h2>
      <Row className="m-3">
        <Col>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email !",
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
            id="firstName"
            name="firstName"
            control={control}
            rules={{ required: "First Name is required" }}
            render={({ field }) => (
              <Input
                autoFocus
                placeholder="Enter First Name"
                invalid={errors.firstName && true}
                {...field}
              />
            )}
          />
          {errors.firstName ? (
            <small className="text-danger">{errors.firstName.message} </small>
          ) : null}{" "}
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Controller
            id="lastName"
            name="lastName"
            control={control}
            rules={{ required: "Last Name is required" }}
            render={({ field }) => (
              <Input
                autoFocus
                placeholder="Enter Last Name"
                invalid={errors.lastName && true}
                {...field}
              />
            )}
          />
          {errors.lastName ? (
            <small className="text-danger">{errors.lastName.message} </small>
          ) : null}{" "}
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          {" "}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/i,
                message:
                  "Please enter a strong password that is atleast 8 characters long with atleast one capital letter, one special character and number.",
              },
            }}
            render={({ field }) => (
              <Input
                type="password"
                placeholder="Enter New Password"
                invalid={errors.password && true}
                {...field}
              />
            )}
          />{" "}
          {errors.password && (
            <div style={{ marginTop: 2 }}>
              <small className="text-danger">{errors.password.message}</small>
            </div>
          )}
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Controller
            id="confirm-password"
            name="repassword"
            control={control}
            rules={{
              required: "Password is required",
              validate: () =>
                getValues("password") === getValues("repassword") ||
                "Passwords do not match !",
            }}
            render={({ field }) => (
              <Input
                type="password"
                className="input-group-merge"
                placeholder="Confirm Password"
                invalid={errors.repassword && true}
                {...field}
              />
            )}
          />{" "}
          {errors.repassword && (
            <div style={{ marginTop: 2 }}>
              <small className="text-danger">{errors.repassword.message}</small>
            </div>
          )}
        </Col>
      </Row>

      <Row className="m-3">
        <Col>
          <Button color="link" outline>
            <small onClick={() => toggleTab("1")} className="text-primary">
              Existing User? Sign in
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
            Register
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterScreen;
