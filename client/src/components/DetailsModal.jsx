import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/globalContext";
// import logo from "../assets/img/reactlogo.png"
import API from "../utils/API";
import { Modal, Button, ListGroup, Item } from "react-bootstrap";
import "../App.css"

function Details(props) {
  const [state, dispatch] = useStoreContext();

  // console.log("CONTEXT TEST: ", state)
  

//   console.log(state);

  // const id = props.id;
//   console.log(id);

  // useEffect(() => {
  //   API.getAlbum(id)
  //     .then((res) => dispatch({ type: "SET_CURRENT_ALBUM", album: res.data }))
  //     .catch((err) => console.log(err));
  // }, []);

  // console.log("current album - ", state.currentAlbum)

  //   const addToPlaylist = () => {
  //     dispatch({
  //       type: ADD_FAVE,
  //       post: state.currentAlbum
  //     });
  //   };

  //   const removeFromPlaylist = () => {
  //     dispatch({
  //       type: REMOVE_FAVE,
  //       _id: state.currentAlbum._id
  //     });
  //   };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            bandwagon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{textAlign: "center"}}>Thanks for the support!</h4>
          {/* <ListGroup>
            {state.currentAlbum.map((song) => {
              <ListGroup.Item>
                  {currentAlbum.song}
              </ListGroup.Item>;
            })}
          </ListGroup> */}
        </Modal.Body>
        <Modal.Footer>
          <Button className="closeBtn" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Details;
