import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

import "../App.css"


function Signup(props) {
    return (

        <div id="loginContainer">
            <Container style={{ justifyContent: "center" }}>
                <Row>
                    <img style={{ margin: "1% auto" }} id="loginLogo" src={require("./images/newlogo.png")}></img>
                </Row>
                <Row>
                    <h2 style={{ width: "100%", textAlign: "center" }}>Sign Up</h2>
                </Row>
                <Row>
                    <Form id="formContainer" style={{ margin: "3% auto" }}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
    </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Remember Me"

                            />
                        </Form.Group>
                        <div id="radioBox">
                            <Form.Check
                                type="radio"
                                label="Listener"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                type="radio"
                                label="Artist"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />
                        </div>


                        <Button variant="dark" type="submit">
                            Submit
  </Button>

                    </Form>

                </Row>

            </Container>

        </div>

    )
}

export default Signup; 