import React, { useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import video from "./videos/stock_footage_concert.mp4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link, Redirect } from "react-router-dom";
import { authenticate } from "./helper";
import UserContext from "../utils/UserContext";
import { useStoreContext } from "../utils/globalContext";
import { handleLogin } from "../stitch/authentication";

import axios from "axios";

import "../App.css";

function Login(props) {
  const [signInData, updateSignIn] = useState({
    email: "",
    password: "",
    token: "",
    user: {},
  });

  const { email, password } = signInData;

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    updateSignIn({
      ...signInData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // signIn(signInData)

    axios({
      method: "POST",
      url: "/api/signin",
      data: { email, password },
    })
      .then((res) => {
        console.log("successfully signed in");
        toast.success(`Hey ${res.data.user.name}, Welcome back!`);
        // authenticate(res, ()=>{
        //reset sign in form
        updateSignIn({
          ...signInData,
          email: "",
          password: "",
          token: res.data.token,
          user: res.data.user,
        });

        // })

        // return res.data
      })
      .catch((err) => {
        console.log("error" + err);
        toast.error("Failed to sign in");
      });
  };

   // attempts to integrate AWS/Stitch signup

  const [global, dispatch] = useStoreContext();
  let userEmail = global.user.email;
  let userPass = global.user.password;
  console.log(global);

  const loginAccount = () => {
    handleLogin(userEmail, userPass)
      .then((user) => console.log(user))
      .catch((err) => console.warn(err));
  };

  // ------------------------------------------

  return (
    <div id="loginContainer">
      <ToastContainer />
      <video id="videoBackground" style={{}} autoPlay muted loop>
        <source src={video} type="video/mp4"></source>
      </video>
      {signInData.token && signInData.user.role === "listener" ? (
        <Redirect to="/listener" />
      ) : null}
      {signInData.token && signInData.user.role === "artist" ? (
        <Redirect to="/admin/dashboard" />
      ) : null}
      <Container style={{ justifyContent: "center" }}>
        <Row>
          <img
            style={{ margin: "1% auto" }}
            id="loginLogo"
            src={require("../components/images/newlogo.png")}
          ></img>
        </Row>
        <Row></Row>
        <Row>
          <Form id="formContainer" style={{ margin: "3% auto" }}>
            <h3 style={{ width: "100%", textAlign: "center", color: "white" }}>
              Login
            </h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={signInData.email}
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={signInData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Remember Me"
              />
            </Form.Group>

            <Button variant="dark" type="submit" onClick={handleSubmit, loginAccount}>
              Login
            </Button>
            <a href="/signup">
              {" "}
              <Button className="offset-4" variant="dark">
                Sign Up
              </Button>{" "}
            </a>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
