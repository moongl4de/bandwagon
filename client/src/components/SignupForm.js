import React, { useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
import video from "./videos/stock_footage_concert.mp4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import { AWS, createAccount } from "../stitch/app"
import { useStoreContext } from "../utils/globalContext";
import { handleSignup } from "../stitch/authentication";
import { Link, Redirect } from "react-router-dom";
import { isAuth } from "./helper";

import "../App.css";

function Signup(props) {
  const [userState, setUserState] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (event) => {
    setUserState({
      ...userState,
      [event.target.name]: event.target.value,
    });
  };

  const setRole = (event) => {
    console.log(event.target.value);
    setUserState({
      ...userState,
      role: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      //  url:`${process.env.REACT_APP_API}/signup`,
      // url: 'http://localhost:8000/api/signup',
      url: "/api/signup",
      data: userState,
      method: "POST",
    })
      .then((res) => {
        toast.success(
          "Email has been sent to the address provided. Please Follow Instruction"
        );
        // return res.data;
        //reset the user inputs
        setUserState({
          name: "",
          email: "",
          password: "",
          role: "",
        });
      })
      .catch((err) => {
        console.log("catch mesay");
        console.log("error");
        toast.error(err.response.data.error);
      });
//call Stitch signup
      // createAccount()
  };

  // attempts to integrate AWS/Stitch signup

  const [global, dispatch] = useStoreContext();
  let userEmail = global.user.email;
  let userPass = global.user.password;
  console.log(global);

  const createAccount = () => {
    handleSignup(userEmail, userPass);
  };

// get auth data from local 
const authData = isAuth();

  // ------------------------------------------

  return (
    <Fragment>
      {/*Hide sign up for logged in user - checks on localstorage and logs in user if token and user info exist */}
    { authData && authData.role === 'listener' ? <Redirect to="/listener" /> : null }
    { authData &&  authData.role === 'artist' ? <Redirect to="/admin/dashboard" /> : null}
    <div id="loginContainer">
      <ToastContainer />
      <video id="videoBackground" style={{}} autoPlay muted loop>
        <source src={video} type="video/mp4"></source>
      </video>
      <Container style={{ justifyContent: "center" }}>
        <Row>
          <img
            style={{ margin: "1% auto" }}
            id="loginLogo"
            src={require("./images/newlogo.png")}
          ></img>
        </Row>
        <Row>
          <h3 style={{ width: "100%", textAlign: "center", color: "white" }}>
            Sign Up
          </h3>
        </Row>
        <Row>
          <Form id="formContainer" style={{ margin: "3% auto" }}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={userState.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={userState.email}
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
                value={userState.password}
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
            <div id="radioBox" onChange={(event) => setRole(event)}>
              <Form.Check
                type="radio"
                label="Listener"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value="listener"
              />
              <Form.Check
                type="radio"
                label="Artist"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                value="artist"
              />
            </div>

            <Button
              variant="dark"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <a href="/">
              <Button className="offset-3" variant="dark">
                Sign In
              </Button>{" "}
            </a>
          </Form>
        </Row>
      </Container>
    </div>
    </Fragment>
    
  );
}

export default Signup;
