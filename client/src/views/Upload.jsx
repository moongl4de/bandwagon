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
import { thArray, tdArray } from "../variables/Variables.jsx";
import API from "../utils/API";
import { useStoreContext } from "../utils/globalContext";
import logo from "../assets/img/reactlogo.png";
import { ToastContainer, toast } from "react-toastify";
import algoliasearch from "algoliasearch";
import { SongContext } from "../utils/songContext";

// const searchClient = algoliasearch('BY7RM0A5T2',
//   'c84d9d93579f57a4c7c7123119c9f4b2');
// const index = client.initIndex('songs');

// function sendToAlgolia() {
// const records =
// index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
//  }

function Upload() {
  // access album's global state
  const [state, dispatch] = useStoreContext();

  const artRef = useRef();
  const songsRef = useRef();

  const [files, setFiles] = useState({
    art: ""
  });

  const [album, setAlbum] = useState({
    _id: "",
    user: "",
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
    const createAlbum = async () => {
      const response = await API.createAlbum();
      setAlbum({
        ...album,
        ...response.data,
        user: JSON.parse(localStorage.getItem("user"))._id
      })
    };
    createAlbum()
  }, []);


  const setLoading = () => {
    dispatch({ type: "LOADING" });
  };

  const handleArtUpload = () => {
    const artFile = Object.values(artRef.current.files);
    handleFileUpload(artFile)
      .then((response) => {
        setAlbum({ ...album, art: response });
        console.log("Art: successfully loaded to AWS", response);
        toast.success("Art: successfully selected");
      })
      .catch((err) => {
        console.log(err);
        toast.danger("Something went wrong");
      });
  };


  // SONGS 

  // const [song, setSong] = useState({
  //   title: "",
  //   fileUrl: "",
  // });

  // const addSongs = (title, fileUrl) => {
  //   setSongs([...songs, {title, fileUrl}])
  // }

  // const updateSongs = ({ target }) => {
  //   setSong({
  //     [target.name]: target.value,
  //   });
  //   console.log("SONG STATE on change", song)
  // };
  
  const handleSongUpload = () => {
    const audiofile = Object.values(songsRef.current.files);

    handleFileUpload(audiofile)
    .then((response) => {
      console.log("Audio: successfully loaded to AWS", response);

    //  let newTitle = audiofile.forEach((file) => {
    //       console.log("each song title", file.name);
    //     //  setSong({...song, title: file.name})
    //     });

      response.forEach((url) => {
          console.log("each fileUrl:", url)
          const title = url.split("-")[1]
          console.log("SONG TITLE",title)
            API.uploadSongs({
              albumId: album._id,
              title: title,
              fileUrl: url
            })
            .then((result) => {
              console.log("song sent to db", result.data.song_ids);
              // setAlbum({ ...album, song_ids: [result.data.song_ids] });
              // toast.success("Songs successfully loaded");
            })
            .catch((err) => {
              console.log(err);
              // toast.danger( "Something went wrong" );
            });
        })
      })
      .catch((err) => {
        console.log(err);
        // toast.danger( "Something went wrong" );
      });
  };

  // TODO: add validation for loading img and mp3 !before! able to hit submit (if no img selected - load bandwagon logo as default?)

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Album to toad to DB", titleRef.current.value);
    setLoading();
    // console.log("SONG", song)
    console.log("Album to update", album)
    API.updateAlbum({
      _id: album._id,
      // user: "",
      title: album.title,
      description: album.description,
      art: album.art,
      // song_ids: [],
      
    })
      .then((result) => {
        console.log("update was sent to DB!", result);
        dispatch({
          type: "ADD_ALBUM",
          album: result,
        });
        toast.success("Successfully Uploaded to Website");
      })
      .catch((err) => {
        console.log(err);
        // toast.danger( "Something went wrong" );
      });

    // titleRef.current.value = "";
    // descriptionRef.current.value = "";
    // releaseRef.current.value = "";
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
                  <Form className="m-3">
                    <Form.Label>
                      Step 1. - Fill out ALL of the fields
                    </Form.Label>
                    <input
                      className="form-control mb-5"
                      required
                      onChange={updateAlbum}
                      // ref={titleRef}
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
                    <input
                      className="form-control mb-5"
                      onChange={updateAlbum}
                      name="description"
                      // ref={descriptionRef}
                      placeholder="Description"
                    />
                    <Form.Label>Step 2. - Choose cover art file</Form.Label>
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
                  <Form className="m-3">
                    <Form.Label>Step 4. - Choose Song(s) to Upload</Form.Label>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        variant="success"
                        // onChange={updateSongs}
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
