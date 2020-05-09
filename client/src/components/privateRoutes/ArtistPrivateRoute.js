import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from '../helper'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import routes from "../../routes";

const ArtistPrivateRoute = ({ component: Component, ...props }) => {
  console.log("artist me");
  return (
    <Route
      {...props}
      {...routes}
      render={
        ({ location }) =>
        isAuth() && isAuth().role === 'artist' ? (
          <Component {...props}  {...routes} />
        ) : (
            <React.Fragment>
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
              <ToastContainer />
              {toast.error("Please login first")}
            </React.Fragment>

          )
      }
    />
  );
}


export default ArtistPrivateRoute;
