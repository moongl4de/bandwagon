import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import AdminNavbarLinks from "./adNavbarLinks.jsx";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
    return (

     
      <Navbar collapseOnSelect bg="light" variant="light" expand="lg">
        
          <Navbar.Brand
            href="#pablo">{this.props.brandText}
          </Navbar.Brand>
          
          
          <Navbar.Toggle onClick={this.mobileSidebarToggle} aria-controls="basic-navbar-nav"  />
           
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <AdminNavbarLinks />
        </Navbar.Collapse>
        
        </Navbar>
     
    );
  }
}

export default Header;
