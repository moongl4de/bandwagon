import React from "react"
import "../App.css"
import ArtistContainer from "../components/ArtistContainer"

function Center() {
    let backgroundImageVariable = "https://www.followlyrics.com/storage/7/62272.jpg"
    return (
        <div>
        <div className="containerTest" style={{backgroundImage: 'url(https://www.followlyrics.com/storage/7/62272.jpg)', backgroundSize: "150%"}}>
        <ArtistContainer />
        <i class="fas fa-heart fa-2x"></i>
        <i class="fas fa-share fa-2x"></i>
        </div>
       
        </div>
    )
}

export default Center;