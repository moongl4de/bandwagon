import React, { Component } from "react";
import { NavItem, Nav, Navbar } from "react-bootstrap";
import { signout } from "./helper"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link, Redirect } from "react-router-dom";

class AdminNavbarLinks extends Component {

  state = {
    loggedIn: true
  }

  logOut = () => {
    signout(() => this.setState(() => ({
      loggedIn: false
    })));
    toast.success("Signed Out")
  }

  render() {
    // redirect user to log in page when logout is clicked
    if (this.state.loggedIn === false) {
      return <Redirect to='/' />
    }
    
    return (
      <div>
        <ToastContainer />
        <Nav className="mr-auto">
         
          <NavItem eventKey={2} href="#"
            className="mr-5">
            Buy Tokens
          </NavItem>
          <NavItem eventKey={3} href="#"
            className="mr-5">
            Marketing
          </NavItem>

          <NavItem eventKey={4} href="#"
            className="mr-5" onClick={() => this.logOut()}>
            Log out
          </NavItem>
        </Nav>

      </div>
    );
  }
}

export default AdminNavbarLinks;
