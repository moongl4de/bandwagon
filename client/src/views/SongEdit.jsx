import React, { useState, useEffect  } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "../components/adCard.jsx";
import { Redirect } from "react-router-dom"
import API from "../utils/API";
import Button from "../components/adCustomButton.jsx";
import { isAuth } from "../components/helper";




function UserProfile() {
  const array= {
    data: [
      { album: "Fight With Tools", song: "Handlebars", date: "1999", edit: "", delete: "" },
      { album: "Grand National", song: "Daniella", date: "2001", },
      { album: "An Awesome Wave", song: "Breezeblocks", date: "2010", },
      { album: "In With the Old", song: "Ashes", date: "2008", },
      { album: "ExtraOrdinary", song: "Helen", date: "2010", },
      { album: "Food in the Belly", song: "The Letter", date: "2006", },
      { album: "Fight With Tools", song: "Handlebars", date: "1999" },
      { album: "Grand National", song: "Daniella", date: "2001", },
      { album: "An Awesome Wave", song: "Breezeblocks", date: "2010", },
      { album: "In With the Old", song: "Ashes", date: "2008", },
      { album: "ExtraOrdinary", song: "Helen", date: "2010", },
      { album: "Food in the Belly", song: "The Letter", date: "2006", }
    ]
  }

  const [state, setState] = useState([]);

  // const [nam, setName] = useState("test name");
  // const [alb, setAlbum] = useState("test album");
  // const [dat, setDate] = useState("test date");
  // const [description, setDescription] = useState("test description");
  // const [art, setArt] = useState("test art");
  // const [artURL, setArtURL] = useState("https://i.pinimg.com/originals/20/13/ac/2013ac80f2aededf644ac3b96de44a64.jpg");
  const [page, setPage] = useState(false);
  
  const [newsongs, setNewSongs] = useState([]);
  const [editSong, setEditSong] = useState([]);
  
  
  const getSongs = () => {
    const userId = isAuth()._id;
    API.getSongByUserId(userId)
      .then((results) => {
        console.log("all songs from db:", results.data);
        setNewSongs(results.data);
     


       
      })
      .catch((err) => console.log(err));
  };
 
  useEffect(() => {

    getSongs();
    
  }, []); 

const deleteSongs = (song) => {
  console.log("CLICKED SONG", song);

  const id = song._id
  API.deleteAlbum(id)
  .then((res) => {
    console.log("after delete API", res)
    getSongs()
    toast("Your song has been deleted")
     })
  .catch((err) => console.log("ERROR:"+ err));
  
};






function handleEdit(song) {
  // const { albumId, title, date, _id, description} = song
  console.log("YOYOYOYOYOY")
  console.log(song)
  setState({
    title: song.title,
    albumName: song.album["Album title"],
    date: song.date,
    description: song.album.description,
    art: song.album.art
  });
  setEditSong(song)

 

  // setPage(true);
  console.log("go to edit")
}

function renderTableHeader() {
  let header = Object.keys(array.data[0])
  return header.map((key, index) => {
    return <th key={index}>{key.toUpperCase()}</th>
  })
}

function renderTableData() {
  return newsongs.map((song) => {
    console.log(song)
    return (
      <tr key={song.albumId}>
        <td>{song.album["Album title"]}</td>
        <td>{song.title}</td>
        <td>{song.date}</td>
        <td><a style={{ cursor: "pointer", color: "orange" }} class='edit-song'onClick={() => handleEdit(song)}>EDIT</a></td>
        <td><a style={{ cursor: "pointer", color: "red" }} class='delete-song' id={song._id} onClick={() => deleteSongs(song)}>DELETE</a></td>
      </tr>
    )
  })
}

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  
  
  
  
  
  
  
  
  const handleSubmit = e => {
    e.preventDefault();
   
    let data = state
    console.log("HERE")
    console.log(state)
   API.updateSong({ 
    
    ...data,
    ...editSong,
    title: data.title,
       
      })
        .then((result) => {
          console.log("song updated", result.data);
          getSongs();
          toast("Your song has been changed")
        })
        .catch((err) => {
          console.log(err);
        });
    
    // toast("Songs successfully edited");
      
      // updateSongInfo(song)
    
    console.log('Button is clicked!');
    // setPage(true)


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
                  {/* <Form.Row>


                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Album Title:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Album Title"
                        onChange={handleInputChange}
                        value={state.album}
                         />
                    </Form.Group>
                  </Form.Row> */}

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Song Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={state.title}
                        onChange={handleInputChange}
                        name = "title"
                        
                         />
                    </Form.Group>


                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Album Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={state.albumName}
                        onChange={handleInputChange}
                        name="album"
                        disabled
                         />
                    </Form.Group>


                  </Form.Row>

                  <Form.Row>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Description:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={state.description}
                        onChange={handleInputChange}
                        name = "description"
                        disabled
                         />
                    </Form.Group>

                  </Form.Row>

                  <Form.Row>

                    <Form.Group as={Col} controlId="formGridText">
                      <Form.Label>Art URL:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={state.art}
                        onChange={handleInputChange}
                        name="art"
                        disabled
                        />
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









    
          <Row>
            <Col md={12}>
              <Card
                title="Uploaded Music"
                category="Welcome to Your Music Library"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>

                    <Table id='students' className="ml-3" striped hover>
                      <tbody>
                        <tr>{renderTableHeader()}</tr>
                        {renderTableData()}
                      </tbody>
                    </Table>
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
