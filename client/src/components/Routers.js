import React from 'react';
import { BrowserRouter , Switch, Route } from "react-router-dom";
import App from '../App'


const Routes =()=>{
    return(
        <BrowserRouter>
            {/* <Switch> */}
                <Route exact path='/home' component={App} />

            {/* </Switch> */}
        </BrowserRouter>
    )
}

export default Routes;