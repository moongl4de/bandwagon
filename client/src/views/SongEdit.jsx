import React, { useState } from "react";
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
  

  const [state, setState] = useState({
    album: "test album",
    song: "test name",
    date: "test date",
    description: "test description",
    art: "https://i.pinimg.com/originals/20/13/ac/2013ac80f2aededf644ac3b96de44a64.jpg"
  });

  // const [nam, setName] = useState("test name");
  // const [alb, setAlbum] = useState("test album");
  // const [dat, setDate] = useState("test date");
  // const [description, setDescription] = useState("test description");
  // const [art, setArt] = useState("test art");
  // const [artURL, setArtURL] = useState("https://i.pinimg.com/originals/20/13/ac/2013ac80f2aededf644ac3b96de44a64.jpg");
  const [page, setPage] = useState(false);

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  
  
  
  
  
  
  
  
  const handleSubmit = e => {
    e.preventDefault();

    
    console.log('Button is clicked!');
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
                        onChange={handleInputChange}
                        value={state.album}
                         />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Song Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Song Name"
                        onChange={handleInputChange}
                        value={state.song}
                         />
                    </Form.Group>


                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Release Date:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Release Date"
                        onChange={handleInputChange}
                        value={state.date} />
                    </Form.Group>


                  </Form.Row>

                  <Form.Row>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Description:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        onChange={handleInputChange}
                        value={state.description} />
                    </Form.Group>

                  </Form.Row>

                  <Form.Row>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Art Title:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Art"
                        onChange={handleInputChange}
                        value={state.art} />
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
                      src={state.art}
                      style={{ maxWidth: "250px" }}
                      alt=""
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
