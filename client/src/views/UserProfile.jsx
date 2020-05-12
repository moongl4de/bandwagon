import React, { Component, useState, useEffect } from "react";
import { isAuth } from "../components/helper";
import API from "../utils/API"
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

import { UserCard } from "../components/adUserCard.jsx";
import Button from "../components/adCustomButton.jsx";
import backgd from "../assets/img/bands.jpg";
import prophoto from "../assets/img/face-7.jpg";
import { toast } from "react-toastify";

function UserProfile() {

  const [state, setState] = useState({
    name: "",
    email: "",
    userId: "",
    username: "",
    avatar: prophoto,
    primarygenre: "",
    secondarygenre: "",
    city: "",
    country: "",
    youtube: "",
    twitter: "",
    facebook: "",
    instagram: "",
    bio: ""
  });

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = e => {
    e.preventDefault();
    updateArtistProfile(state._id, state)
  }

  useEffect(() => {
    const userId = isAuth()._id;
    API.getArtists().then(res => {
      const currentArtistData = res.data.filter(artist => artist.userId === userId)
      //update state with with current user from artist API call
      setState({
        ...currentArtistData[0],
      })

    })
  }, [])

  //function to update userprofile
  const updateArtistProfile = (id, data) => {
    API.updateArtist(id, data)
      .then((result) => {
        toast.success("successfully updated userprofile")
      }).catch((err) => {
        toast.error("Failed to update userprofile" + err);
      });
  }

  return (
    <div className="content">
      <Container fluid>
        <Row>
          <Col md={8}>
            <Card
              title="Edit Profile"
              content={
                <Form  >
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Band Name:</Form.Label>
                      <Form.Control type="text" placeholder="Band Name" name="name"
                        value={state.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>User Name:</Form.Label>
                      <Form.Control type="text" placeholder="User Name" name="username"
                        value={state.username}
                        onChange={handleInputChange} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>City:</Form.Label>
                      <Form.Control type="text" placeholder="City"
                        name="city"
                        value={state.city}
                        onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Country:</Form.Label>
                      <Form.Control type="text" placeholder="Country" name="country"
                        value={state.country}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Primary Genre:</Form.Label>
                      <Form.Control type="text" placeholder="Genre" name="primarygenre"
                        value={state.primarygenre}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Secondary Genre:</Form.Label>
                      <Form.Control type="text" placeholder="Genre"
                        name="secondarygenre"
                        value={state.secondarygenre}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Facebook:</Form.Label>
                      <Form.Control type="text" placeholder="Link" name="facebook"
                        value={state.facebook}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Twitter:</Form.Label>
                      <Form.Control type="text" placeholder="Link"
                        name="twitter"
                        value={state.twitter}
                        onChange={handleInputChange} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Youtube:</Form.Label>
                      <Form.Control type="text" placeholder="Link"
                        name="youtube"
                        value={state.youtube}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Instagram:</Form.Label>
                      <Form.Control type="text" placeholder="Link"
                        name="instagram"
                        value={state.instagram}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Row>
                    <Col md={12}>
                      <FormGroup controlId="formControlsTextarea">
                        <FormLabel>About Me</FormLabel>
                        <FormControl
                          rows="5"
                          componentClass="textarea"
                          bsClass="form-control"
                          placeholder="Write some stuff here...."
                          name="bio"
                          value={state.bio}
                          onChange={handleInputChange}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button bsStyle="info" pullRight fill type="submit" onClick={handleSubmit}  >
                    Update Profile
                    </Button>
                  <br />




                  <div className="clearfix" />
                </Form>
              }
            />
          </Col>
          <Col md={4}>
            <UserCard
              bgImage={backgd}
              avatar={prophoto}
              name={state.name}
              userName={state.username}
              description={
                <div>
                  <span>
                    {state.city}, {state.country}
                    <br />
                    Genres: {state.primarygenre}, {state.secondarygenre}</span>
                  <br />
                  <br />
                  <span style={{ color: "grey", fontStyle: "italic", }}>
                    "{state.bio}"

                  </span>
                </div>
              }
              socials={
                <div>
                  <Button simple>
                    <a href={state.facebook}> <i className="fa fa-facebook-square" /></a>
                  </Button>
                  <Button simple>
                    <a href={state.twitter}><i className="fa fa-twitter" /></a>
                  </Button>
                  <Button simple>
                    <a href={state.instagram}><i className="fab fa-instagram" /></a>
                  </Button>
                  <Button simple>
                    <a href={state.youtube}><i className="fab fa-youtube" /></a>
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








export default UserProfile;
