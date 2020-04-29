import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AdminLayout from "./pages/Admin.jsx";

import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/pe-icon-7-stroke.css";

ReactDOM.render(
  <React.StrictMode>



    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Redirect from="/admin" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
