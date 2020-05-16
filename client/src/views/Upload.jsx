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
// import { SongContext } from "../utils/songContext";
import { isAuth } from "../components/helper";
import { auth } from "google-auth-library";
import "font-awesome/css/font-awesome.min.css";
import { Link } from 'react-router-dom'

function Upload() {
  // access album's global state, set local states and refs for file upload to AWS

  const [state, dispatch] = useStoreContext();
  const artRef = useRef();
  const songsRef = useRef();
  const [files, setFiles] = useState({
    art: "",
  });
  const [loadingAWS, setLoadingAWS] = useState({
    loading: false,
  });
  const [loadingArt, setLoadingArt] = useState(false);
  const [validation, setValidation] = useState(false)
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

  useEffect(() => {
    //get current user
    const user = isAuth();
    const createAlbum = async () => {
      const response = await API.createAlbum();
      setAlbum({
        ...album,
        ...response.data,
        user: user,
      });
    };
    // console.log("user - ", user)
    createAlbum();
  }, []);
  const setLoading = () => {
    dispatch({ type: "LOADING" });
  };

  // ART UPLOAD

  const handleArtUpload = () => {
    const artFile = Object.values(artRef.current.files);
    if (!artFile.length) {
      toast.warning("Please fill out all fields");
    } else {
      setLoadingArt(true);
      handleFileUpload(artFile)
        .then((response) => {
          setAlbum({ ...album, art: response });
          setValidation(true)
          setLoadingArt(false);
          console.log("Art: successfully loaded to AWS", response);
          toast("Art successfully uploaded!");
        })
        .catch((err) => {
          console.log(err);
          setLoadingArt(false);
          toast.warning("Unable to upload art, please try again.");
        });
    }
  };

  // SONGS UPLOAD

  const handleSongUpload = () => {
    const audiofile = Object.values(songsRef.current.files);
    if (!audiofile.length) {
      toast.warning("Please select files to upload");
      return;
    } else {
      setLoadingAWS({ loading: true });
      handleFileUpload(audiofile)
        .then((response) => {
          console.log("Audio: successfully loaded to AWS", response);
          // for each song we make an API call that loads files to S3 and sends url strings to mongodb collection
          response.forEach((url) => {
            // console.log("each fileUrl:", url);
            const Songtitle = url.split("-")[1];

            API.uploadSongs({
              albumId: album._id,
              title: Songtitle,
              fileUrl: url,
              user: album.user,
            })
              .then((result) => {
                // console.log("song sent to db", result.data);
                setAlbum({ ...album, song_ids: result.data.song_ids });
                setLoadingAWS({ loading: false });
              })
              .catch((err) => {
                console.log(err);
              });
          });
          toast("Songs successfully uploaded!");
        })
        .catch((err) => {
          console.log(err);
          setLoadingAWS({ loading: false });
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
      user: album.user,
      title: album.title,
      description: album.description,
      art: album.art,
    })
      .then((result) => {
        // console.log("Updated album", result);
        dispatch({
          type: "ADD_ALBUM",
          album: result,
        });

        // AND SEND UPLOADED ART TO SONG COLLECTION FOR EACH SONG
        console.log("stuff for song update", album, album._id);

        setAlbum({ ...album });

        API.insertAlbumInfo({
          albumId: album._id,
          album: album,
          // album_art: album.art
        })
          .then((res) => {
            // console.log("after upload art API", res);
          })
          .catch((err) => {
            console.log(err);
          });
        toast("Album successfully uploaded!");
        // CLEAR FORM
        // setAlbum({
        //   title: "",
        //   description: "",
        // });
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
        <Row className="justify-content-md-center">
          <Col>
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
                      {loadingAWS.loading ? (
                        <Button style={{textAlign: "center", verticalAlign: "middle"}} className="mt-3" variant="primary">
                          {" "}
                          <i className="fas fa-compact-disc fa-spin" style={{backgroundColor:"blue", marginRight: "20px"}}></i>Loading music
                        </Button>
                      ) : (
                        <Button
                          className="mt-3"
                          variant="primary"
                          onClick={handleSongUpload}
                        >
                          Step 1 - Upload songs
                        </Button>
                      )}
                    </Form.Group>
                  </Form>
                </div>
              }
            />
          </Col>
          <Col>
            <Card
              title="Album Details"
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
                      name="Album title"
                      placeholder="Title"
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
                    {loadingArt ? (
                        <Button style={{textAlign: "center"}} className="mt-3" variant="primary">
                          {" "}
                          <i className="fas fa-compact-disc fa-spin" style={{backgroundColor:"blue", marginRight: "20px"}}></i>Loading Art
                        </Button>
                      ) : (
                        <Button
                          className="mt-3"
                          variant="primary"
                          onClick={handleArtUpload}
                        >
                          Step 2 - Upload Art
                        </Button>
                      )}
                  </Form>
                </div>
              }
            />
          </Col>

          {validation ? (
          <Col>
            <Card
              title="Upload to the Website"
              category="Finish your submission"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <Form className="m-3" onSubmit={handleSubmit}>

                  {/* <Link to="/admin/dashboard"> */}
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={state.loading}
                      >
                        Step 3 - Finish Upload!
                      </Button>
                      {/* </Link> */}
                  </Form>
                </div>
              }
            /> 
          </Col>
          ) : (<div></div>)}
        </Row>
      </Container>
    </div>
  );
}

export default Upload;
