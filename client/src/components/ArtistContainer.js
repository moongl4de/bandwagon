import React from "react"
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';

//placeholder code

function ArtistContainer() {
    return (
        <Row>
        <div  className="artistContainer">
            <h3 style={{textAlign: "center"}}>Emancipator</h3>
            <h6 style={{textAlign: "center"}}>Soon It Will Be Cold Enough</h6>
            
            
            <img id="albumArt" src="https://www.followlyrics.com/storage/7/62272.jpg"></img>
            
        </div>
        </Row>
    )
}

export default ArtistContainer;