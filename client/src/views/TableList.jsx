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
                title="Upload Art"
                category="Enter info below to upload."
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                  <Form className="m-3" onSubmit={handleSubmit}>

                  
                   <Form.Group controlId="formBasicPassword">
                      <Form.Label>Step 1. - Upload Band Art</Form.Label>
                      <Form.Control variant="danger" type="file" ref={fileInput} multiple/>
                  </Form.Group>
                  <Button variant="danger" type="submit">
                      Upload Art
                    </Button>
                  </Form>
            
                  </div>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                title="Upload Music"
                category="Enter info below to upload."
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                  <Form className="m-3" onSubmit={handleSubmit}>

                  
                   
                  
                  <Form.Group  as={Col} md="6" controlId="formBasicPassword">
                      <Form.Label>Step 2. - Select Art to Apply to Song(s) You're Uploading</Form.Label>
                      {/* <Form.Control type="selectOne"/> */}
                      <div className="form-group">
                    <label for="category">Select Art:</label>
                    <select className="custom-select" id="designation">
                    </select>
                </div>
                      <Form.Label>Step 3. - Choose Song(s) to Upload</Form.Label>
                      <Form.Control type="file" ref={fileInput} multiple/>
                      <Form.Label>Step 4. - Upload!</Form.Label>
                    </Form.Group>
                    <Button variant="danger" type="submit">
                      Upload Music
                    </Button>
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


export default TableList;
