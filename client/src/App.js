import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './App.css';
import Header from "./components/Header"
import Center from "./components/Center"
import BottomPlayer from "./components/PlayerFooter"
import Layout from "./components/Layout"
import Subscription from "./components/Subscription"

import FileInput from "./components/FileInput"
import Artist from "./pages/Artist"
import Admin from "./pages/Admin"
import {StoreProvider} from "./utils/globalContext"
import Login from "./components/LoginForm"
import Signup from "./components/SignupForm"
import ActivateUser from './components/ActivateUser';

import { BrowserRouter as Router, Route } from "react-router-dom";


//placeholder code
function App() {
  return (
    <Router>
      <StoreProvider>
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/activate/:token' component={ActivateUser}/>
        <Route exact path='/listener' component={Center}/>
        <Route exact path='/admin/dashboard' component={Admin}/>
        <Route exact path='/test' component={Artist}/>
        <Route exact path='/subscription' component={Subscription}/>
        </StoreProvider>
      </Router>
  );
}

export default App;