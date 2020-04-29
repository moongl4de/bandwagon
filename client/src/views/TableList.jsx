import React, { Component } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";

import Card from "../components/adCard.jsx";
import { thArray, tdArray } from "../variables/Variables.jsx";

function TableList(props) {
  const fileInput = React.createRef()
  const handleFileUpload = props.handleFileUpload

  function handleSubmit(event) {
    event.preventDefault()
    const file = fileInput.current.files[0]
    console.log(`selected file - ${file.name}`);
    handleFileUpload(file)
  }

     return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Upload Music"
                category="Enter info below to upload."
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Form className="m-3" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Upload Audio</Form.Label>
                      <Form.Control type="file" ref={fileInput}/>
                    </Form.Group>
                    <Button variant="danger" type="submit">
                      Upload
                    </Button>
                  </Form>
                }
              />
            </Col>




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


export default TableList;
