import React, { Component, useState } from "react";
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

function UserProfile() {

  const [state, setState] = useState({
    name: "",
    username: "",
    avatar: "",
    primarygenre: "",
    secondarygenre: "",
    city: "",
    country: "",
    social: {
      youtube: "",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    bio: ""
  });

  const [nam, setName] = useState("+Medic");
  const [usernam, setUsername] = useState("medic911");
  const [avata, setAvatar] = useState(prophoto);
  const [primary, setPrimary] = useState("Metal");
  const [secondary, setSecondary] = useState("Soul");
  const [cit, setCity] = useState("Brisbane");
  const [coun, setCountry] = useState("Australia");
  const [you, setYoutube] = useState();
  const [twit, setTwitter] = useState();
  const [face, setFacebook] = useState();
  const [insta, setInstagram] = useState();
  const [bio2, setBio] = useState("A metal band with soulful roots");

  const handleSubmit = e => {
    e.preventDefault();

    setState({
      ...state,
      name: nam,
      username: usernam,
      avatar: avata,
      primarygenre: primary,
      secondarygenre: secondary,
      city: cit,
      country: coun,
      social: {
        youtube: you,
        twitter: twit,
        facebook: face,
        instagram: insta
      },
      bio: bio2
    });

    console.log(state)

  }





  return (
    <div className="content">
      <Container fluid>
        <Row>
          <Col md={8}>
            <Card
              title="Edit Profile"
              content={
                <Form onSubmit={handleSubmit} >
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Band Name:</Form.Label>
                      <Form.Control type="text" placeholder="Band Name" onChange={e => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>User Name:</Form.Label>
                      <Form.Control type="text" placeholder="User Name" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>City:</Form.Label>
                      <Form.Control type="text" placeholder="City" onChange={e => setCity(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Country:</Form.Label>
                      <Form.Control type="text" placeholder="Country" onChange={e => setCountry(e.target.value)} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Primary Genre:</Form.Label>
                      <Form.Control type="text" placeholder="Genre" onChange={e => setPrimary(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Secondary Genre:</Form.Label>
                      <Form.Control type="text" placeholder="Genre" onChange={e => setSecondary(e.target.value)} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Facebook:</Form.Label>
                      <Form.Control type="text" placeholder="Link" onChange={e => setFacebook(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Twitter:</Form.Label>
                      <Form.Control type="text" placeholder="Link" onChange={e => setTwitter(e.target.value)} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Youtube:</Form.Label>
                      <Form.Control type="text" placeholder="Link" onChange={e => setYoutube(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Instagram:</Form.Label>
                      <Form.Control type="text" placeholder="Link" onChange={e => setInstagram(e.target.value)} />
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
                          onChange={e => setBio(e.target.value)}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button bsStyle="info" pullRight fill type="submit"  >
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
              name={nam}
              userName={usernam}
              description={
                <div>
                  <span>
                    {cit}, {coun}
                    <br />
                    Genres: {primary}, {secondary}</span>
                  <br />
                  <br />
                  <span style={{ color: "grey", fontStyle: "italic", }}>
                    "{bio2}"

                  </span>
                </div>
              }
              socials={
                <div>
                  <Button simple>
                    <a href={face}> <i className="fa fa-facebook-square" /></a>
                  </Button>
                  <Button simple>
                    <a href={twit}><i className="fa fa-twitter" /></a>
                  </Button>
                  <Button simple>
                    <a href={insta}><i className="fab fa-instagram" /></a>
                  </Button>
                  <Button simple>
                    <a href={you}><i className="fab fa-youtube" /></a>
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
