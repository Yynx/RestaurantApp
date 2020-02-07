import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class App extends React.Component {
    render(){
        return(
        <React.Fragment>
        <Router>
        <div>
        <Navigation />
            <Switch>
            <Route path="/">
                <div>
                    Home
                </div>
            </Route>
            <Route path="/results">
                <div>
                    results
                </div>
            </Route>
            <Route path="/profile">
                <div>
                    profile
                </div>
            </Route>
            <Route path="/login">
                <div>
                    login
                </div>
            </Route>
            <Route path="/signup">
                <div>
                    signup
                </div>
            </Route>
            </Switch>
        </div>
        </Router>
    </React.Fragment>
    
    );
    }
}
    


const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;