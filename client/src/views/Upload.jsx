
import React, { useRef, useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { handleFileUpload } from "../stitch/app";
import Card from "../components/adCard.jsx";
import { thArray, tdArray } from "../variables/Variables.jsx";
import API from "../utils/API";
import { useStoreContext } from "../utils/globalContext";
import logo from "../assets/img/reactlogo.png"

import algoliasearch from "algoliasearch";

const searchClient = algoliasearch('BY7RM0A5T2',
  'c84d9d93579f57a4c7c7123119c9f4b2');
const index = client.initIndex('songs');

function sendToAlgolia() {
const records =
index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
 }

function Upload() {

  // access global state
  const [state, dispatch] = useStoreContext();

  // set all refs for user input
  const titleRef = useRef();
  const descriptionRef = useRef();
  const releaseRef = useRef();
  const artRef = useRef();
  const songsRef = useRef();

  // TODO: add a cool loader to this page 

  const setLoading = () => {
    dispatch({ type: "LOADING" });
  };

  // empty artUrl for images that are returned from handleFileUpload function (defined in stitch folder)
  
  // console.log(logo)
  let artUrl = [];
  const handleArtUpload = () => {
    const img = Object.values(artRef.current.files);
    handleFileUpload(img)
      .then((response) => {
        artUrl = response;
        console.log("Art: successfully loaded to AWS", artUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // same with audio files

  let audioUrl = [];
  const handleSongUpload = () => {
    const audiofile = Object.values(songsRef.current.files);
    handleFileUpload(audiofile)
      .then((response) => {
        audioUrl = response;
        console.log("Audio: successfully loaded to AWS", audioUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO: add validation for loading img and mp3 !before! able to hit submit (if no img selected - load bandwagon logo as default?)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Album to toad to DB", titleRef.current.value);
    setLoading();

    // API call to create Album object using reducer (defined in globalContext,js)

    API.uploadAlbum({
      // user: "",
      title: titleRef.current.value,
      art: artUrl,
      release: releaseRef.current.value,
      songs: audioUrl,
      description: descriptionRef.current.value,
    })
      .then((result) => {
        console.log("sent to DB", result)
        dispatch({
          type: "ADD_ALBUM",
          post: result,
        });
      })
      .catch((err) => console.log(err));

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    releaseRef.current.value = "";
  };

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
                      required
                      ref={releaseRef}
                      placeholder="Release date"
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
                    <Button variant="danger" onClick={handleArtUpload}>
                      Upload Art
                    </Button>
                    <Form.Group as={Col} md="6" controlId="formBasicPassword">
                      <Form.Label>
                        Step 2. - Select Art to Apply to Song(s) You're
                        Uploading
                      </Form.Label>
                      {/* <Form.Control type="selectOne" /> */}
                      <div className="form-group">
                        <label for="category">Select Art:</label>
                        <select
                          className="custom-select"
                          id="designation"
                        ></select>
                      </div>
                      <Form.Label>
                        Step 3. - Choose Song(s) to Upload
                      </Form.Label>
                      <Form.Control type="file" ref={songsRef} multiple />
                      <Button variant="danger" onClick={handleSongUpload}>
                      Upload Songs
                    </Button>
                      <Form.Label>Step 4. - Upload!</Form.Label>
                    </Form.Group>
                    <Button
                      variant="danger"
                      type="submit"
                      disabled={state.loading}
                    >
                      Submit Album
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



