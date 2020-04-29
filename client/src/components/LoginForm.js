import React, { useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import video from "./videos/stock_footage_concert.mp4";
import { useStoreContext } from "../utils/globalContext";
import axios from "axios";
import "../App.css";

function Login(props) {
  // accessing global state
  const [global, dispatch] = useStoreContext();
//   console.log(global);
  
  const [signInData, updateSignIn] = useState({
    email: "",
    password: "",
  });

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
    signIn(signInData);
  };

  //sign in API call
  function signIn(userCred) {
    axios({
      method: "POST",
      url: "/api/signin",
      data: userCred,
    })
      .then((res) => {
        console.log("successfully signed in");
        // sending user data to global state with dispatch
        dispatch({
            type: "LOGIN_USER",
            payload: res.data,
        });
        //reset sign in form
        updateSignIn({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log("failed to sign in");
      });
  }

  return (
    <div id="loginContainer">
      <video id="videoBackground" style={{}} autoPlay muted loop>
        <source src={video} type="video/mp4"></source>
      </video>

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
            <Button variant="dark" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
