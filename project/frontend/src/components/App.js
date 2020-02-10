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
    Link, 
    Redirect
  } from "react-router-dom";

class App extends React.Component {

    state = {
        searchKeyword:  null,
        latitude : null,
        longitude: null,
        error: null,
        submitted: false
    }

    handleChange = (event) => {
        const {value, name} = event.target
      this.setState({[name] : value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ submitted : true })
    }

    geoOptions = {
        enableHighAccuracy: true, 
        timeout: 5000,
        maxiumAge: 0
    }
    getGeoPositionSuccess = (position) => {
        const crd = position.coords;
          this.setState({latitude: crd.latitude})
          this.setState({longitude: crd.longitude})
    }

    getGeoPositionError = (error) => {
        this.setState({error: [error.code, error.message]})
    }

    getGeoPosition = (event) => {
        navigator.geolocation.getCurrentPosition(this.getGeoPositionSuccess, this.getGeoPositionError, this.geoOptions);
        event.preventDefault()
        console.log('getGeoPosition was pressed!')
    }


    render() {
        console.log(this.state)
        console.log(this.state.latitude)
        console.log(this.state.error)
        return (
            <Router>
            <div>
            <Navigation />
                <Switch>
                <Route path="/search">
                    <Search searchKeyword={this.state.searchKeyword} longitude={this.state.longitude} latitude={this.state.latitude} />
                </Route>
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
                    {this.state.submitted ? <Redirect to="/search" /> : <Home handleChange={this.handleChange} getGeoPosition={this.getGeoPosition} handleSubmit={this.handleSubmit} />}
                </Route>
                </Switch>
            </div>
            </Router>
    );
    }
}
    
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;