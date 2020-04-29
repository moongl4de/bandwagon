import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="#pablo">Donate</a>
              </li>
              
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href= "#pablo">
              Bandwagon
            </a>
            , where music happens
          </p>
        </Container>
      </footer>
    );
  }
}

export default Footer;
