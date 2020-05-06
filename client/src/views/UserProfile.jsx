import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Form
} from "react-bootstrap";

import { Card } from "../components/adCard.jsx";
import { FormInputs } from "../components/adFormInputs.jsx";
import { UserCard } from "../components/adUserCard.jsx";
import Button from "../components/adCustomButton.jsx";
import backgd from "../assets/img/bands.jpg";
import avatar from "../assets/img/face-7.jpg";

class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-4"]}
                      properties={[
                        {
                          label: "Band Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Band Name",
                          disabled: false
                        },
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",

                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Primary Genre",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Genre",

                        },
                        {
                          label: "Secondary Genre",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Genre",
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Facebook Link",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Link",
                        },
                        {
                          label: "Twitter Link",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Link",
                        },
                        {
                          label: "Instagram Link",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Link",
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "City",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",

                        },
                        {
                          label: "Country",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",

                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <FormLabel>About Me</FormLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Write some stuff here...."

                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
                    <br />




                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
            <UserCard
              bgImage={backgd}
              avatar={avatar}
              name="+ Medic"
              userName="medic2019"
              description={
                <span>
                  "Brisbane, Australia"
                    <br />
                    "Soul Metal"


                  </span>
              }
              socials={
                <div>
                  <Button simple>
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button simple>
                    <i className="fa fa-twitter" />
                  </Button>
                  <Button simple>
                    <i className="fab fa-instagram" />
                  </Button>
                </div>
              }
            />
          </Col>
          </Row>
            <Row>
              <Col md={8}>
                <Card
                  title="Edit Profile Image"
                  content={
                    <form>
                      <Row className="mt-3">
                        <Col md={12}>
                          <FormGroup controlId="formControlsTextarea">




                            <Form.Label>Choose Profile Picture to Upload</Form.Label>
                            <Form.Control type="file" />
                            <Form.Label>Upload!</Form.Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button bsStyle="info" pullRight fill type="submit">
                        Upload Profile Image
                    </Button>


                    </form>
                  }
                />

</Col>
            </Row>
            






          
          
        </Container>
      </div >
    );
  }
}

export default UserProfile;
