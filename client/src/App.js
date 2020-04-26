import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './App.css';
import Header from "./components/Header"
import Center from "./components/Center"
import BottomPlayer from "./components/PlayerFooter"
import Layout from "./components/Layout"
import Signup from "./components/Signup"
import Signin from "./components/Signin"

import { BrowserRouter as Router, Route } from "react-router-dom";

function Home(){
  return(
    <Layout>
    <div>
      
      <Header />
      <Center />
      <ReactJkMusicPlayer />,

      </div>
      </Layout>
  )
}

//placeholder code
function App() {
  return (
    <Router>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/signin' component={Signin}/>
      </Router>
  );
}

export default App;
