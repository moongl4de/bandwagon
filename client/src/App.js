import React from 'react';
import "react-jinke-music-player/assets/index.css";
import './App.css';
import Center from "./components/Center"
import Login from "./components/Login"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp"


function App() {
  return (
    <BrowserRouter>
    <div>
     
      <Route exact path="/" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/listener" component={Center}/>
    </div>
    </BrowserRouter>
      
  );
}

export default App;
