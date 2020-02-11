import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import axios from "axios";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    Redirect
  } from "react-router-dom";
import Axios from "axios";

class App extends React.Component {

    state = {
        searchKeyword:  null,
        searchLocation: null,
        latitude : null,
        longitude: null,
        error: null,
        submitted: false,
        fetched: false
    }

    refreshState = () => {
        this.setState( {submitted: false,
            fetched: false, error: null})
    }

    handleChangeKeyword = (event) => {
        const {value, name} = event.target
        this.setState({[name] : value})
    }

    handleChangeLocation = (event) => {
        const {value, name} = event.target
        this.setState({[name] : value}, () => this.convertSearchLocationToCoordinates())
    }

    handleSubmit = (event) => {
        if(this.state.fetched){
        this.setState({ submitted : true })
        }
        event.preventDefault()
    }
    
    // near me
    geoOptions = {
        enableHighAccuracy: true, 
        timeout: 5000,
        maxiumAge: 0
    }

    getGeoPositionSuccess = (position) => {
        const crd = position.coords;
        this.setState({latitude: crd.latitude, longitude: crd.longitude, submitted : true })
    }

    getGeoPositionError = (error) => {
        this.setState({error: [error.code, error.message]})
    }
    

    getGeoPosition = (event) => {
        navigator.geolocation.getCurrentPosition(this.getGeoPositionSuccess, this.getGeoPositionError, this.geoOptions);
        
        event.preventDefault()
        console.log('getGeoPosition was pressed!')
    }
    
    //second input
    convertSearchLocationToCoordinates = () => {
       const {searchLocation} = this.state; 
       axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchLocation}.json?access_token=pk.eyJ1IjoibGF3Y2FrZSIsImEiOiJjazZnb3c3enUwOTg1M2pwOHJmcXNjdnNyIn0.2R2s_StXtwU8C8jDiQAXnA`)
       .then(response => {
           let longitude = response.data.features[0].center[0]
           let latitude = response.data.features[0].center[1]
           this.setState({longitude: longitude, latitude: latitude, fetched: true})
       })
       .catch(error => this.setState({error: error}))
    }
    
    componentDidUpdate() {
        console.log(this.state)
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
                    <Search searchKeyword={this.state.searchKeyword} longitude={this.state.longitude} latitude={this.state.latitude} refreshState={this.refreshState}/>
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
                    {this.state.submitted ? <Redirect to="/search" /> : <Home handleChangeLocation={this.handleChangeLocation} handleChangeKeyword={this.handleChangeKeyword} getGeoPosition={this.getGeoPosition} handleSubmit={this.handleSubmit} />}
                </Route>
                </Switch>
            </div>
            </Router>
    );
    }
}
    
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;