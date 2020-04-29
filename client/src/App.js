import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './App.css';
// import Header from "./components/Header"
import Center from "./components/Center"
import BottomPlayer from "./components/PlayerFooter"
import Layout from "./components/Layout"

import FileInput from "../src/components/FileInput"

import Artist from "./pages/Artist"

import Login from "./components/LoginForm"
import Signup from "./components/SignupForm"
<<<<<<< HEAD
import AdminLayout from "./pages/Admin.jsx";
=======
import ActivateUser from './components/ActivateUser';
>>>>>>> de395b18c0b4129736e604a59d3a74280e9908e4

import { BrowserRouter as Router, Route } from "react-router-dom";

import {Stitch} from "mongodb-stitch-browser-sdk";

Stitch.initializeDefaultAppClient("bandwagon-qlcuw");



//placeholder code
function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Route exact path='/' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/listener' component={Center} />
      <Route exact path='/artist' component={Artist} />

    </Router>
=======
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/activate/:token' component={ActivateUser}/>
        <Route exact path='/listener' component={Center}/>
        <Route exact path='/artist' component={Artist}/>
      </Router>
>>>>>>> de395b18c0b4129736e604a59d3a74280e9908e4
  );
}

export default App;