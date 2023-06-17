import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Modal,
  Offcanvas,
  Card,
  CardGroup,
  Table,
  ButtonGroup,
  InputGroup,
  Form,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import "./auth.css";
const initialState = {
  email: "",
  password: "",
};
export default function AuthPage(props) {
  let [authMode, setAuthMode] = useState("signin");
  let [isError, setIsError] = useState(null);
  let [user, setUser] = useState(initialState);

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    setUser(initialState);
  };
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.table({ name, value });
    setUser({ ...user, [name]: value });
  };
  const { email, password } = user;

  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      console.table(user);
      let url =
        authMode === "signin"
          ? `http://localhost:5000/auth/login`
          : `http://localhost:5000/auth/register`;
      const res = await axios.post(url, {
        ...user,
      });
      console.log(res);
      setUser({ ...user.data, err: "", success: res.data.success });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("firstName", res.data.firstName);
      localStorage.setItem("lastName", res.data.lastName);
      localStorage.setItem("isConnected", res.data.isconnected);

      navigate("/tasks", { state: user.data });
    } catch (err) {
      console.log(err);
      return setIsError(err?.response?.data?.message || err.message);
    }
  };
  function Example({
    heading = "Erreur",
    content = "Merci d'essayer plus tard",
    variant = "danger",
  }) {
    return (
      <Alert dismissible variant={variant}>
        {/* <Alert.Heading>{heading}</Alert.Heading> */}
        <p>{isError}</p>
      </Alert>
    );
  }
  if (authMode === "signin") {
    return (
      <Container className="Auth-form-container">
        <Form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                id="email"
                name="email"
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                onChange={handleChangeInput}
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={handleSubmite}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
            {isError && (
              <p className="text-center mt-2">
                <Example />
              </p>
            )}
          </div>
        </Form>
      </Container>
    );
  } else {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>First Name *</label>
              <input
                type="text"
                className="form-control mt-1"
                id="firstName"
                name="firstName"
                placeholder="e.g Jane"
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name *</label>
              <input
                type="text"
                className="form-control mt-1"
                id="lastName"
                name="lastName"
                placeholder="e.g Doe"
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email *</label>

              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                id="email"
                name="email"
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                onChange={handleChangeInput}
                placeholder="Enter password"
              />{" "}
            </div>

            <div className="form-group mt-3">
              <label>confirm password *</label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                className="form-control"
                onChange={handleChangeInput}
                placeholder="Confirm password"
              />{" "}
            </div>

            <div className="form-group mt-3">
              <label>Gender *</label>
              <select
                className="form-control mt-1"
                id="gender"
                name="gender"
                onChange={handleChangeInput}
              >
                <option>Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="custom">Custom</option>
                {/* <Form.Control onChange={handleChangeInput} name="sex"  /> */}
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Phone *</label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="form-control"
                onChange={handleChangeInput}
                placeholder="phone number"
              />{" "}
            </div>
            {/* <Form.Group className="mb-3" controlId="addRegion">
            <Form.Label>Region</Form.Label>
            <Form.Select aria-label="Dtefault select example">
              <option>Choisir...</option>
              <option value="0">CAP BON</option>
              <option value="1">CENTRE</option>
              <option value="2">GRAND TUNIS</option>
          
              <option value="3">NORD</option>
              <option value="4">NORD OUEST</option>
              <option value="5">SAHEL</option>
             
              <option value="6">SFAX</option>
              <option value="7">SUD EST</option>
              <option value="8">SUD OUEST</option>     
              <Form.Control onChange={handleChange} name="adresse"  />
            </Form.Select> */}
            <div className="form-group mt-3">
              <label>cin *</label>
              <input
                type="text"
                className="form-control mt-1"
                id="cin"
                name="cin"
                onChange={handleChangeInput}
                placeholder="CIN"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={handleSubmite}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
            {isError && (
              <p className="text-center mt-2">
                <Example />
              </p>
            )}
          </div>
        </form>
      </div>
    );
  }
}
