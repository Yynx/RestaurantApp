import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class App extends React.Component {

    render() {
        return (
            <Router>
            <div>
            <Navigation />
                <Switch>
                <Route path="/search" exact component={Search} />
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                </Switch>
            </div>
            </Router>
    );
    }
}
    
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;