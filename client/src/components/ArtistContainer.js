import React from "react"
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';

//placeholder code

function ArtistContainer() {
    return (
        <Row>
        <div  className="artistContainer">
            <h3 style={{textAlign: "center"}}>Placeholder Artist</h3>
            <h6 style={{textAlign: "center"}}>Placeholder Album Title</h6>
            
            
            <img id="albumArt" src="https://upload.wikimedia.org/wikipedia/commons/7/77/Question_mark-pixels.jpg"></img>
            
        </div>
        </Row>
    )
}

export default ArtistContainer;