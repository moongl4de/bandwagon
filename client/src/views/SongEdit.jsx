import React, { Component, useState } from "react";
import {
  Container,
  Row,
  Col,



  Form
} from "react-bootstrap";

import { Card } from "../components/adCard.jsx";
import { Redirect } from "react-router-dom"

import Button from "../components/adCustomButton.jsx";




function UserProfile() {
  console.log("Hello Alan")

  const [state, setState] = useState({
    name: "",
    album: "",
    date: "",
    description: "",
    art: ""
  });

  const [nam, setName] = useState("test name");
  const [alb, setAlbum] = useState("test album");
  const [dat, setDate] = useState("test date");
  const [description, setDescription] = useState("test description");
  const [art, setArt] = useState("test art");
  const [artURL, setArtURL] = useState("https://i.pinimg.com/originals/20/13/ac/2013ac80f2aededf644ac3b96de44a64.jpg");
  const [page, setPage] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    setState({
      ...state,
      name: nam,
      album: alb,
      date: dat,
      description: description,
      art: art
    });
    console.log('Button is cliked!');
    setPage(true)


  }



  return (



    <div className="content">
      {(page === true) ? (
        <Redirect to="/admin/library" />
      ) : null}
      <Container fluid>
        <Row>
          <Col md={8}>
            <Card
              title="Edit Selected Song"
              category="Please select a song from the Library to edit"
              content={
                <Form onSubmit={handleSubmit} >
                  <Form.Row>


                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Album Title:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Album Title"
                        onChange={e => setAlbum(e.target.value)}
                        defaultValue={alb} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Song Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Song Name"
                        onChange={e => setName(e.target.value)}
                        defaultValue={nam} />
                    </Form.Group>


                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Release Date:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Release Date"
                        onChange={e => setDate(e.target.value)}
                        defaultValue={dat} />
                    </Form.Group>


                  </Form.Row>

                  <Form.Row>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Description:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}
                        defaultValue={description} />
                    </Form.Group>

                  </Form.Row>

                  <Form.Row>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Art Title:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Art"
                        onChange={e => setArt(e.target.value)}
                        defaultValue={art} />
                    </Form.Group>

                  </Form.Row>









                  <Button bsStyle="info" pullRight fill type="submit" >
                    Update Song
                    </Button>

                  <br />




                  <div className="clearfix" />
                </Form>
              }
            />


          </Col>
          <Col md={4}>
            <Card
              title="Album Art"

              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <center>
                    <img
                      src={artURL}
                      style={{ maxWidth: "250px" }}
                    ></img>
                  </center>

                </div>
              }
            />
          </Col>
        </Row>









      </Container>
    </div >
  );
}








export default UserProfile;
