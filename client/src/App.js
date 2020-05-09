import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './App.css';
import Header from "./components/Header"
import Center from "./components/Center"
import BottomPlayer from "./components/PlayerFooter"
import Layout from "./components/Layout"
import Subscription from "./components/Subscription"
import Upload from "./pages/test"
import Admin from './pages/Admin';
import User from './views/UserProfile';
import AdminLayout from "./pages/Admin.jsx";

// import FileInput from "./components/FileInput"
// import AWS from "./stitch/app"

import { StoreProvider } from "./utils/globalContext"
import Login from "./components/LoginForm"
import Signup from "./components/SignupForm"
import ActivateUser from './components/ActivateUser';
import ArtistPage from "./components/ArtistPage"
import ArtistPrivateRoute from "./components/privateRoutes/ArtistPrivateRoute"
import ListenerPrivateRoute from "./components/privateRoutes/ListenerPrivateRoute"
import AdminPrivateRoute from "./components/privateRoutes/AdminPrivateRoute"
// import UserProfile from "./views/UserProfile.jsx";
// import Upload from "./views/Upload.jsx";
// import Library from "./views/Library.jsx";


import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


//placeholder code
function App() {
  return (
    <Router>
      <StoreProvider>
      <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/activate/:token' component={ActivateUser}/>
        <Route exact path='/listener' component={Center}/>
        {/* <Route exact path='/admin/dashboard' component={Admin}/> */}
        <Route exact path='/test' component={ Upload }/>
        <Route exact path='/subscription' component={Subscription}/>
        <Route exact path='/artistpage' component={ArtistPage}/>
        <ListenerPrivateRoute exact path='/listener' component={Center}/>
        {/* <ArtistPrivateRoute exact path='/admin/dashboard' component={Admin}/>
        <ArtistPrivateRoute exact path='/admin/user' component={UserProfile}/>
        <ArtistPrivateRoute exact path='/admin/upload' component={Upload}/>
        <ArtistPrivateRoute exact path='/admin/library' component={Library}/> */}
        {/* <Route exact path='/test' component={AWS}/> */}
        <ListenerPrivateRoute exact path='/subscription' component={Subscription}/>
        <ArtistPrivateRoute exact path='/artistpage' component={ArtistPage}/>
        <Switch>
        <ArtistPrivateRoute path="/admin" render={props => <AdminLayout {...props} />} />
          <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
      </StoreProvider>
    </Router>

  );
}

export default App;