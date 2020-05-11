import React, { useSate, useEffect } from "react";
import { useStoreContext } from "../utils/globalContext";
// import logo from "../assets/img/reactlogo.png"
import API from "../utils/API";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, CardColumns, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Details from "./DetailsModal";

function AlbumList() {
  // access global state of albums
  const [state, dispatch] = useStoreContext();

  const [modalShow, setModalShow] = React.useState(false);

  //   console.log(state)

  const getAlbums = () => {
    dispatch({ type: "LOADING" });
    API.getAlbums()
      .then((results) => {
        console.log("all albums from db:", results.data);
        dispatch({
          type: "LOAD_ALBUMS",
          albums: results.data,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAlbums();
    console.log("useEffect State:",state)
  }, []);

  return (
    <Container>
      <h1>All Albums</h1>
      {state.albums.length ? (
        <CardColumns>
          {state.albums.map((album) => (
            <Card style={{ width: "18rem" }} key={album._id}>
              <Card.Img
                variant="top"
                src={album.art}
                style={{ height: "300px" }}
              />
              <Card.Body>
                <Card.Title>{album.title}</Card.Title>
                <Card.Text>{album.description}</Card.Text>
                <Button onClick={() => setModalShow(true)}> Details </Button>
                {/* <Link to={"/albums/" + album._id}> */}
                <Details id={album._id} show={modalShow} onHide={() => setModalShow(false)} />
                {/* </Link> */}
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Added {album.date}</small>
              </Card.Footer>
            </Card>
          ))}
        </CardColumns>
      ) : (
        <h3>No albums available.</h3>
      )}
    </Container>
  );
}

export default AlbumList;

{
  /* // <strong>
// {album.title} by User name here {}
// {album.songs}
// </strong> */
}
