import React from "react"
import { useStoreContext } from "../utils/globalContext";
import Search from "./Searchbar"
import ReactDOM from "react-dom";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import AlbumList from "./AlbumList"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-jinke-music-player/lib/styles/index.less";
import "../App.css"

function Center() {

  return (
    <div style={{ backgroundColor: "#313131", height: "100vh" }}>
      <Search />
      <div id="centerDiv">
        <AlbumList />
      </div>

    </div>
  )
}

export default Center;