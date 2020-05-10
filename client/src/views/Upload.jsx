
import React, { useRef, useState } from "react";
import { Container, Row, Col, Table, Form, Button, ListGroupItem } from "react-bootstrap";
import { handleFileUpload } from "../stitch/app";
import Card from "../components/adCard.jsx";
import { thArray, tdArray } from "../variables/Variables.jsx";
import API from "../utils/API";
import { useStoreContext } from "../utils/globalContext";
import logo from "../assets/img/reactlogo.png"
import { ToastContainer, toast } from "react-toastify";

import algoliasearch from "algoliasearch";

// const searchClient = algoliasearch('BY7RM0A5T2',
//   'c84d9d93579f57a4c7c7123119c9f4b2');
// const index = client.initIndex('songs');

// function sendToAlgolia() {
// const records =
// index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
//  }

function Upload() {

  // access global state
  const [state, dispatch] = useStoreContext();

  //get user info from LS
  let user = JSON.parse(localStorage.getItem('user'))
  let userId = user._id;
  console.log("Current Artist's ID ", userId)

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
        toast.success( "Art: successfully selected" );
      })
      .catch((err) => {
        console.log(err);
        toast.danger( "Something went wrong" );
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
        toast.success( "Music: successfully selected" );
      })
      .catch((err) => {
        console.log(err);
        // toast.danger( "Something went wrong" );
      });
  };

  // TODO: add validation for loading img and mp3 !before! able to hit submit (if no img selected - load bandwagon logo as default?)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Album to toad to DB", titleRef.current.value);
    setLoading();

    // API call to create Album object using reducer (defined in globalContext,js)

    API.uploadAlbum({
      user: userId,
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
          album: result,
        });
        toast.success( "Successfully Uploaded to Website" );
      })
      .catch((err) => {
        console.log(err);
        // toast.danger( "Something went wrong" );
      });

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    releaseRef.current.value = "";
  };

  return (
    <div className="content">
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col md={6}>
            <Card
              title="Upload Art"
              category="Follow the steps below to upload."
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>


                  <Form className="m-3" >
                    <Form.Label>Step 1. - Fill out ALL of the fields</Form.Label>
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
                    <Form.Label>Step 2. - Choose cover art file</Form.Label>
                    <Form.Group controlId="formBasicPassword">

                      <Form.Control
                        variant="success"
                        type="file"
                        ref={artRef}
                        multiple
                      />
                    </Form.Group>

                    <Button variant="primary" onClick={handleArtUpload}>
                      Step 3. - Click Here
                    </Button>

                  </Form>
                </div>
              }
            />
          </Col>

          <Col md={6}>
            <Card
              title="Upload Music"
              category="Follow the steps below to upload."
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  {/* <Form className="m-3" onSubmit={handleSubmit}> */}
                  {/* </Form> */}
                  <Form className="m-3" >

                    <Form.Label>Step 4. - Choose Song(s) to Upload</Form.Label>
                    <Form.Group controlId="formBasicPassword">

                      <Form.Control
                        variant="success"
                        type="file"
                        ref={songsRef}
                        multiple
                      />
                   

                    <Button className="mt-3" variant="primary" onClick={handleSongUpload}>
                      Step 5. - Click Here
                    </Button>
                    </Form.Group>

                    <Form.Group>

                    
                    


                    </Form.Group>
                  </Form>
                </div>
              }
            />
<Card
              title="Upload to the Website"
              category="Finish your submission"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  {/* <Form className="m-3" onSubmit={handleSubmit}> */}
                  {/* </Form> */}
                  <Form className="m-3" onSubmit={handleSubmit}>
                  <ListGroupItem className="text-center">
                    <Button 
                      
                      variant="danger"
                      type="submit"
                      disabled={state.loading}
                    >Step 6. Click Here To Upload
                    </Button>
                    </ListGroupItem>
                    </Form>


                  </div>
              }
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Upload;








