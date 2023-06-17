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
const initialState = {
  email: "",
  password: "",
};

function Auth() {
  const navigate = useNavigate();
  const isConnected = localStorage.getItem("isConnected");

  const [user, setUser] = useState(initialState);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.table({ name, value });
    setUser({ ...user, [name]: value });
  };
  const { email, password } = user;

  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/login`, {
        email,
        password,
      });
      console.log(res);
      setUser({ ...user.data, err: "", success: res.data.msg });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("firstLogin", true);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("isConnected", res.data.isconnected);

      navigate("/", { state: user.data });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div fluid="sm">
      <Form className="text-left">
        <div className="form">
          <div id="username-field" className="field-wrapper input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="email"
              onChange={handleChangeInput}
            />
          </div>

          <div id="password-field" className="field-wrapper input mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-lock"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChangeInput}
            />
          </div>
          <div className="d-sm-flex justify-content-between">
            <div className="field-wrapper toggle-pass">
              <p className="d-inline-block">Show Password</p>
              <label className="switch s-primary">
                <input
                  type="checkbox"
                  id="toggle-password"
                  className="d-none"
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="field-wrapper">
              <button
                onClick={handleSubmite}
                type="submit"
                className="btn btn-primary"
                value=""
              >
                Log In
              </button>
            </div>
          </div>

          <div className="field-wrapper text-center keep-logged-in">
            <div className="n-chk new-checkbox checkbox-outline-primary">
              <label className="new-control new-checkbox checkbox-outline-primary">
                <input type="checkbox" className="new-control-input" />
                <span className="new-control-indicator"></span>Keep me logged in
              </label>
            </div>
          </div>

          <div className="field-wrapper">
            <a href="auth_pass_recovery.html" className="forgot-pass-link">
              Forgot Password?
            </a>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Auth;
