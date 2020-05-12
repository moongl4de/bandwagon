import React, { Component } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";

import Card from "../components/adCard.jsx";


const thArray = ["Album", "Song", "Release Date", "Edit", "Delete"];
const tdArray = [
  ["Fight With Tools", "Handlebars", "1999"],
  ["Grand National", "Daniella", "2001"],
  ["An Awesome Wave", "Breezeblocks", "2010"],
  ["In With the Old", "Ashes", "2008"],
  ["ExtraOrdinary", "Helen", "2010"],
  ["Food in the Belly", "The Letter", "2006"]
];


class Library extends Component {




  
  render() {
    return (


     
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
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
              />
            </Col>


          </Row>
        </Container>
      </div>
      );
    }
  }


export default Library;
