import React, { useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import video from "./videos/stock_footage_concert.mp4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Redirect } from "react-router-dom";
import { authenticate, isAuth } from "./helper";
// import UserContext from "../utils/UserContext";
// import { useStoreContext } from "../utils/globalContext";
import { handleLogin } from "../stitch/authentication";

import axios from "axios";
import API from "../utils/API"

import "../App.css";

function Login(props) {
  const [signInData, updateSignIn] = useState({
    email: "",
    password: "",
    token: "",
    user: {},
    authCalled: false,
    paymentRequired: 'false'
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios({
      method: "POST",
      url: "/api/signin",
      data: { email, password },
    })
      .then((res) => {
        console.log("successfully signed in", res);

        //call to save token on cookie and user info on localstorage
        authenticate(res, () => {
          API.getUsers()
            .then((result) => {
              const currentUser = result.data.filter(user => user.email === res.data.user.email);
              //checks if user needs to make payment and sets payment state to true 
              if (currentUser[0].paymentRequired === 'true') {
          
                updateSignIn({
                  ...signInData,
                  token: res.data.token,
                  user: res.data.user,
                  paymentRequired: currentUser[0].paymentRequired
                });

              } else {
                updateSignIn({
                  ...signInData,
                  token: res.data.token,
                  user: res.data.user,
                });
              }

            })
            toast.success(`Hey ${res.data.user.name}, Welcome back!`)
        })
          .catch((err) => {
            console.log("error" + err);
            toast.error("Failed to sign in");
          });
      })
      .catch((err) => {
        console.log("error" + err);
        toast.error("Failed to sign in");
      });
    // AWS/Stitch signup
    loginAccount();
  };

  // attempts to integrate AWS/Stitch signup

  // const [global, dispatch] = useStoreContext();
  let userEmail = signInData.email;
  let userPass = signInData.password;
  // console.log(global);

  const loginAccount = () => {
    handleLogin(userEmail, userPass)
      .then((user) => console.log(user))
      .catch((err) => console.warn(err));
  };
  //    let authData = {};
  // // get auth data from local 
  // if(signInData.authCalled === false){
  //   authData = isAuth();
  //   console.log("authdata = ", authData)
  //   updateSignIn({
  //     ...signInData,
  //     ...authData,
  //    authCalled : true,
  //   //  paymentRequired: authData.user.paymentRequired
  //   });


  // }


  // // ------------------------------------------
  // if((authData && authData.role === 'listener') && signInData.paymentRequired === 'true'){
  //   console.log("1 auth")
  //   return (<Redirect to="/subscription" />);
  //   } else  
  //   if((authData && authData.role === 'listener') && signInData.paymentRequired === 'false'){
  //     console.log("2 auth")
  //     return (<Redirect to="/listener" />);
  //     } 
  //     else
  //      if(authData &&  authData.role === 'artist'){
  //   return (<Redirect to="/admin/dashboard" />);
  //   } else {



  return (
    <Fragment>


      <div id="loginContainer">
        <ToastContainer />
        <video id="videoBackground" style={{}} autoPlay muted loop>
          <source src={video} type="video/mp4"></source>
        </video>
        {/* checks on localstorage and logs in user if token and user info exist */}
        {(signInData.user.role === "listener") && signInData.paymentRequired === 'false' ? (
          <Redirect to="/listener" />
        ) : null}
        {(signInData.user.role === "listener") && signInData.paymentRequired === 'true' ? (
          <Redirect to="/subscription" />
        ) : null}
        {signInData.user.role === "artist" ? (
          <Redirect to="/admin/dashboard" />
        ) : null}
        <Container style={{ justifyContent: "center" }}>
          <Row>
            <img
              style={{ margin: "1% auto" }}
              id="loginLogo"
              src={require("../components/images/newlogo.png")}
              alt=""
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

              <Button variant="dark" onClick={handleSubmit}>
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
    </Fragment>
  );
  // }
}

export default Login;
