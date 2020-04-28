import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Logo from '../img/newlogoRev2.png'


function Search() {

  <Navbar bg="dark" variant="dark" className="mb-3">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src={Logo}
        width="35"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      bandwagon
    </Navbar.Brand>
  
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
  
    <Form inline>
    
      <FormControl  type="text" placeholder="search" className="mr-sm-2" style={{minWidth: "34rem"}}/>
      <Button variant="outline-info"className= "search mr-sm-4 ">Search</Button>
      
    </Form>
    </Navbar.Collapse>
    
    <Nav className="mr-auto">
    <Navbar.Collapse className="justify-content-end">
     
      
      <NavDropdown title= {<span className="text-light my-auto">Do Stuff</span>} id="basic-nav-dropdown "className="mr-5">
        <NavDropdown.Item href="#action/3.1">Buy Tokens</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Dashboard</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
      </NavDropdown>
   
    </Navbar.Collapse>
    </Nav>
</Navbar>

    )
}

export default Search;





