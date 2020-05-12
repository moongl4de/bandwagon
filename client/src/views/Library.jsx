import React, { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useStoreContext } from "../utils/globalContext";
import Card from "../components/adCard.jsx";
import { Redirect } from "react-router-dom"






function Library() {

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
  

  

  function handleDelete(e) {
    e.preventDefault();
    console.log("deleted")
  }

  function handleEdit(e) {
    e.preventDefault();
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
    return array.data.map((data, index) => {
      const { album, song, date } = data //destructuring
      return (
        <tr key={album}>
          <td>{album}</td>
          <td>{song}</td>
          <td>{date}</td>
          <td><a style={{ cursor: "pointer", color: "orange" }} class='edit-song'onClick={handleEdit}>EDIT</a></td>
          <td><a style={{ cursor: "pointer", color: "red" }} class='delete-song' onClick={handleDelete}>DELETE</a></td>
        </tr>
      )
    })
  }


  
    return (
      <div className="content">
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
