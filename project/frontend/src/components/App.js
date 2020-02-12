import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import Find from "./Find";
import Results from "./Results";
import Profile from "./Profile";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import axios from "axios";

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
        searchLocation: null,
        latitude : null,
        longitude: null,
        error: null,
        submitted: false,
        fetched: false,
        loggedIn: false,
        username: null
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
    
    //set username
    setUsername = (username) => {
        this.setState({username : username, loggedIn : true})
    }

    componentDidMount() {
        // get user id & jwt token from local storage
        // then refresh the token,
        // if token is expired logout user
        let token = localStorage.getItem("token")
        // let id = localStorage.getItem("id")
        if(token) {
            axios.post('/api/v1/refresh', {token: token})
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                this.setState({ loggedIn : true })
            })
            .catch(() => this.setState({ loggedIn : false }))
        } else {
            this.setState({ loggedIn : false })
        }
    }

    logOut = () => {
        this.setState( {loggedIn : false})
    }
    
    render() {
        console.log(this.state)
        console.log(this.state.latitude)
        console.log(this.state.error)
        return (
            <Router>
            <div>
            <Navigation loggedIn={this.state.loggedIn} />
                <Switch>
                <Route path="/results">
                    <Results searchKeyword={this.state.searchKeyword} longitude={this.state.longitude} latitude={this.state.latitude} refreshState={this.refreshState}/>
                </Route>
                <Route exact path="/login">
                    <Login setUsername = {this.setUsername} />
                </Route>
                <Route exact path="/logout">
                    <Logout logOut={this.logOut} />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/profile">
                    <Profile username={this.state.username} />
                </Route>
                <Route exact path="/">
                    {this.state.submitted ? <Redirect to="/results" /> : <Find handleChangeLocation={this.handleChangeLocation} handleChangeKeyword={this.handleChangeKeyword} getGeoPosition={this.getGeoPosition} handleSubmit={this.handleSubmit} />}
                </Route>
                </Switch>
            </div>
            </Router>
    );
    }
}
    
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;