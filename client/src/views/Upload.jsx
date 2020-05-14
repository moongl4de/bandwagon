import React, { useRef, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { handleFileUpload } from "../stitch/app";
import Card from "../components/adCard.jsx";
import API from "../utils/API";
import { useStoreContext } from "../utils/globalContext";
import logo from "../assets/img/reactlogo.png";
import { ToastContainer, toast } from "react-toastify";
import algoliasearch from "algoliasearch";
import { SongContext } from "../utils/songContext";
import { isAuth } from "../components/helper";
import { auth } from "google-auth-library";


function Upload() {
  // access album's global state and set local state for file upload
  const [state, dispatch] = useStoreContext();
  const artRef = useRef();
  const songsRef = useRef();
  const [files, setFiles] = useState({
    art: "",
  });
  const [form, setValidateForm] = useState({
    validated: false
  });
  const [album, setAlbum] = useState({
    _id: "",
    user: {},
    title: "",
    description: "",
    art: "",
    song_ids: [],
  });
  const updateFiles = ({ target }) => {
    setFiles({
      ...files,
      [target.name]: target.value,
    });
  };
  const updateAlbum = ({ target }) => {
    setAlbum({
      ...album,
      [target.name]: target.value,
    });
  };
  //on page load create an empty album with user id to get album's id to upload songs to
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  useEffect(() => {
    //get current user from local storage
    const user = isAuth();
    const createAlbum = async () => {
      const response = await API.createAlbum();
      setAlbum({
        ...album,
        ...response.data,
        user: user
      })
    };
    console.log("user - ", album.user)
    createAlbum()
  }, []);
  const setLoading = () => {
    dispatch({ type: "LOADING" });
  };
  // ART UPLOAD
  const handleArtUpload = () => {
    const artFile = Object.values(artRef.current.files);
    if (!artFile.length) {
      toast.warning("Please select a file to upload");
    } else {
      handleFileUpload(artFile)
        .then((response) => {
          setAlbum({ ...album, art: response });
          console.log("Art: successfully loaded to AWS", response);
          toast("Art successfully uploaded!");
          setValidateForm({ validated: true })
        })
        .catch((err) => {
          console.log(err);
          toast.warning("Unable to upload art, please try again.");
        });
    }
  };
  // SONGS UPLOAD
  const handleSongUpload = () => {
    const audiofile = Object.values(songsRef.current.files);
    if (!audiofile.length) {
      toast.warning("Please fill out all fields");
      return;
    } else {
      handleFileUpload(audiofile)
        .then((response) => {
          console.log("Audio: successfully loaded to AWS", response);
          // for each song we make an API call that loads files to S3 and sends url strings to mongodb collection
          response.forEach((url) => {
            console.log("each fileUrl:", url);
            const Songtitle = url.split("-")[1];

            API.uploadSongs({
              user: userId,
              albumId: album._id,
              title: Songtitle,
              fileUrl: url,
              // album_art: album.art
            })
              .then((result) => {
                // console.log("song sent to db", result.data.song_ids);
              })
              .catch((err) => {
                console.log(err);
              });
          });
          toast("Songs successfully uploaded!");
        })
        .catch((err) => {
          console.log(err);
          toast.warning("Unable to upload songs, please try again.");
        });
    }
  };

    
  
  // SUBMIT FORM
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading();
    API.updateAlbum({
      _id: album._id,
      user: userId,
      title: album.title,
      description: album.description,
      art: album.art,
    })
      .then((result) => {
        console.log("Updated album", result);
        dispatch({
          type: "ADD_ALBUM",
          album: result,
        });
        // AND SEND UPLOADED ART TO SONG COLLECTION FOR EACH SONG
        console.log("stuff for song update", album._id, album.art);
        API.uploadArt({
          albumId: album._id,
          album_art: album.art,
        })
          .then((res) => {
            console.log("after upload art API", res);
          })
          .catch((err) => {
            console.log(err);
          });
        toast("Album successfully uploaded!");
        // CLEAR FORM 
        setAlbum({
          title: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Something went wrong, please try again.");
      });
  };

  return (
    <div className="content">
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col md={4}>
            <Card
              title="Upload Music"
              category="Follow the steps below to upload."
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <Form className="m-3">
                    <Form.Label>Choose Song(s) to Upload</Form.Label>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        variant="success"
                        name="fileUrl"
                        type="file"
                        ref={songsRef}
                        multiple
                      />
                      <Button
                        className="mt-3"
                        variant="primary"
                        onClick={handleSongUpload}
                      >
                        Step 1. - Upload songs
                      </Button>
                    </Form.Group>
                    <Form.Group></Form.Group>
                  </Form>
                </div>
              }
            />
          </Col>
          <Col md={4}>
            <Card
              title="Album details"
              // category="Follow the steps below to upload."
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <Form className="m-3">
                    <Form.Label>Fill out the fields</Form.Label>
                    <input
                      className="form-control mb-5"
                      required
                      onChange={updateAlbum}
                      name="title"
                      placeholder="Album Title"
                    />
                    {/* <input
                      className="form-control mb-5"
                      required
                      // ref={releaseRef}
                      onChange={updateAlbum}
                      name="release"
                      placeholder="Release date"
                    /> */}
                    <Form.Control
                      as="textarea"
                      rows="4"
                      className="form-control mb-5"
                      onChange={updateAlbum}
                      name="description"
                      placeholder="Album description"
                    />
                    <Form.Label>Choose cover art file</Form.Label>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        variant="success"
                        onChange={updateFiles}
                        name="art"
                        type="file"
                        ref={artRef}
                        multiple
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={handleArtUpload}>
                      Step 2. - Upload Art
                    </Button>
                  </Form>
                </div>
              }
            />
          </Col>
          <Col md={4}>
            <Card
              title="Upload to the Website"
              category="Finish your submission"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <Form className="m-3" onSubmit={handleSubmit}>
                    <ListGroupItem className="text-center">
                      <Button
                        variant="danger"
                        type="submit"
                        disabled={state.loading}
                      >
                        Step 3. Finish Upload!
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



