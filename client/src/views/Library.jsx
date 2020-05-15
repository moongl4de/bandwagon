import React, { useState, useEffect  } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useStoreContext } from "../utils/globalContext";
import Card from "../components/adCard.jsx";
import { Redirect } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import API from "../utils/API";




function Library({updateSongInfo}) {
console.log("THIIIIISSSS:")
// console.log(props)
const [page, setPage] = useState(false);
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
    const [songs, setSongs] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const getSongs = () => {
      API.getSongs()
        .then((results) => {
          console.log("all songs from db:", results.data);
          setSongs(results.data);
          setSearchResults(results.data)
  
  
         
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
      toast.success("Your song has been deleted")
       })
    .catch((err) => console.log("ERROR:"+ err));
    
};

  
  

  function handleDelete(e) {
    e.preventDefault();
    console.log("deleted")
    toast.success("Your song has been deleted");
  }

  function handleEdit(song) {
    
    

    setPage(true);
    console.log("go to edit")
  }

  function renderTableHeader() {
    let header = Object.keys(array.data[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  function renderTableData() {
    return songs.map((song) => {
      const { albumId, title, date, _id } = song //destructuring
      return (
        <tr key={albumId}>
          <td>{albumId}</td>
          <td>{title}</td>
          <td>{date}</td>
          <td><a style={{ cursor: "pointer", color: "orange" }} class='edit-song'onClick={() => handleEdit(song)}>EDIT</a></td>
          <td><a style={{ cursor: "pointer", color: "red" }} class='delete-song' id={_id} onClick={() => deleteSongs(song)}>DELETE</a></td>
        </tr>
      )
    })
  }


  
    return (
      <div className="content">
        <ToastContainer />
      {(page === true) ? (
        <Redirect to="/admin/edit" />
      ) : null}


     
        <Container fluid>
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
      </div>
    );
              }




export default Library;
