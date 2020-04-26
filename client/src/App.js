import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './App.css';
import Header from "./components/Header"
import Center from "./components/Center"
import BottomPlayer from "./components/PlayerFooter"




//placeholder code
function App() {
  return (
    <div>
      <Header />
    
      <Center />
      <ReactJkMusicPlayer />,

      </div>
      
   
  );
}

export default App;
