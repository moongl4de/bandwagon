import React, { Component } from "react";
import { NavItem, Nav, Navbar} from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    
    return (
      <div>
        
       <Nav className="mr-auto">  
          <NavItem eventKey={1} href="#"
          className="mr-5" >
            Account
          </NavItem>
          <NavItem eventKey={2} href="#"
          className="mr-5">
            Buy Tokens
          </NavItem>
          <NavItem eventKey={3} href="#"
          className="mr-5">
            Marketing
          </NavItem>
         
          <NavItem eventKey={4} href="#"
          className="mr-5">
            Log out
          </NavItem>
        </Nav>
        
      </div>
    );
  }
}

export default AdminNavbarLinks;
