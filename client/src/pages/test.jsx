import React, { Component, useRef } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { handleFileUpload } from "../stitch/app";
import Card from "../components/adCard.jsx";
import { thArray, tdArray } from "../variables/Variables.jsx";
import API from "../utils/API";
import { useStoreContext } from "../utils/globalContext";

function Upload () {
  
  const [state, dispatch] = useStoreContext();
  
  const songsRef = useRef();
  const artRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  
  const setLoading = () => {
    dispatch({ type: "LOADING" });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const fileArray = []
    const audiofile = Object.values(songsRef.current.files);
    // const artfile = Object.values(artRef.current.files);
    // fileArray.push(audiofile, artfile)
    handleFileUpload(audiofile)
      .then((response) => {
        console.log("React: successfully loaded to AWS", response);
        console.log("name", titleRef.current.value)
        setLoading();
        API.uploadAlbum({
          // user: "",
          title: titleRef.current.value,
          art: response,
          release: "123",
          songs: response,
          description: descriptionRef.current.value,
        })
          .then((result) => {
            dispatch({
              type: "ADD_ALBUM",
              post: result,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });

  titleRef.current.value = "";
  descriptionRef.current.value = "";
  }

  return (
    <div className="content">
      <Container fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Upload Music"
              category="Enter info below to upload."
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  {/* <Form className="m-3" onSubmit={handleSubmit}> */}
                  {/* </Form> */}
                  <Form className="m-3" onSubmit={handleSubmit}>
                    <input
                      className="form-control mb-5"
                      required
                      ref={titleRef}
                      placeholder="Album Title"
                    />
                    <input
                      className="form-control mb-5"
                      ref={descriptionRef}
                      placeholder="Description"
                    />
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Step 1. - Upload Band Art</Form.Label>
                      <Form.Control
                        variant="danger"
                        type="file"
                        ref={artRef}
                        multiple
                      />
                    </Form.Group>
                    {/* <Button variant="danger" type="submit">
                      Upload Art
                    </Button> */}
                    <Form.Group as={Col} md="6" controlId="formBasicPassword">
                      {/* <Form.Label>
                        Step 2. - Select Art to Apply to Song(s) You're
                        Uploading
                      </Form.Label>
                      <Form.Control type="selectOne"/>
                      <div className="form-group">
                        <label for="category">Select Art:</label>
                        <select
                          className="custom-select"
                          id="designation"
                        ></select>
                      </div> */}
                      <Form.Label>
                        Step 3. - Choose Song(s) to Upload
                      </Form.Label>
                      <Form.Control type="file" ref={songsRef} multiple />
                      <Form.Label>Step 4. - Upload!</Form.Label>
                    </Form.Group>
                    <Button variant="danger" type="submit" disabled={state.loading}>
                      Upload Album
                    </Button>
                  </Form>
                </div>
              }
            />
          </Col>

          <Col md={12}>
            {/* <Card
              title="Uploaded Music"
              category="Welcome to Your Music Library"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {thArray.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tdArray.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {prop.map((prop, key) => {
                            return <td key={key}>{prop}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            /> */}
          </Col>
        </Row>
      </Container>
    </div>
 );
}


export default Upload;
