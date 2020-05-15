import React from 'react';
// import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './App.css';
import Center from "./components/Center"
// import BottomPlayer from "./components/PlayerFooter"
import Subscription from "./components/Subscription"
import Upload from "./pages/test"
import Admin from './pages/Admin';
import Admin2 from './pages/Admin2';
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
import Info from "./components/Info"
// import UserProfile from "./views/UserProfile.jsx";
// import Upload from "./views/Upload.jsx";
// import Library from "./views/Library.jsx";


import { BrowserRouter as Router, Route } from "react-router-dom";


//placeholder code
function App() {
  return (
    <Router>
      <StoreProvider>
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/activate/:token' component={ActivateUser} />
        <ListenerPrivateRoute exact path='/listener' component={Center} />
        <ListenerPrivateRoute exact path='/subscription' component={Subscription} />
        <ArtistPrivateRoute exact path='/admin/dashboard' component={Admin}/>
        <ArtistPrivateRoute exact path='/admin/user' component={Admin}/>
        <ArtistPrivateRoute exact path='/admin/edit' component={Admin}/>
        <ArtistPrivateRoute exact path='/admin/upload' component={Admin}/>
        <ArtistPrivateRoute exact path='/admin/library' component={Admin}/>
        <ArtistPrivateRoute exact path='/artistpage' component={ArtistPage}/>
        <ArtistPrivateRoute exact path='/artistpage' component={ArtistPage}/>
        <AdminPrivateRoute exact path='/admin/admin' component={Admin2}/>
        {/* <Route exact path='/admin/admin' component={Admin2}/> */}
        <Route exact path="/info" component={Info}/>
      </StoreProvider>
    </Router>

  );
}

export default App;