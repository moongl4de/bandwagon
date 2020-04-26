import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './App.css';
import Header from "./components/Header"
import Center from "./components/Center"
import BottomPlayer from "./components/PlayerFooter"
import Layout from "./components/Layout"

import Login from "./components/LoginForm"
import Signup from "./components/SignupForm"

import { BrowserRouter as Router, Route } from "react-router-dom";


//placeholder code
function App() {
  return (
    <Router>
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/listener' component={Center}/>
      </Router>
  );
}

export default App;
