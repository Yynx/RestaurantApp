import React from "react";
import axios from "axios";
import Restaurant from "./Restaurant";

class Search extends React.Component {
    
    state = {
        data : null
    }

    
    getRestaurants = () => {
        const headers = {
            'user-key': "89313d2549eb39affea00277f30d405d"
        }

        let url;

        if (this.props.latitude && this.props.longitude && this.props.searchKeyword) {
            url=`https://developers.zomato.com/api/v2.1/search?q=${this.props.searchKeyword}&lat=${this.props.latitude}&lon=${this.props.longitude}`
        } else if (this.props.latitude && this.props.longitude) {
            url=`https://developers.zomato.com/api/v2.1/search?lat=${this.props.latitude}&lon=${this.props.longitude}`
        }

        let newYork = 'https://developers.zomato.com/api/v2.1/search?lat=40.7128&lon=74.0060'
     
        axios.get(url, {headers})
        .then(response => this.setState({data : response}, () => this.leaflet()))
    }

    leaflet = () => {
       const mymap = L.map('mapid').setView([51.505, -0.09], 13);
        const zoomLevel= 10;
        const column =5;
        const row = 2;
        const accessToken = 'pk.eyJ1IjoibGF3Y2FrZSIsImEiOiJjazZnb3c3enUwOTg1M2pwOHJmcXNjdnNyIn0.2R2s_StXtwU8C8jDiQAXnA'
        L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: accessToken
}).addTo(mymap);
this.state.data.data.restaurants.map((restaurant) => { 
    let marker = L.marker([restaurant.restaurant.location.latitude, restaurant.restaurant.location.longitude]).addTo(mymap)
    marker.bindPopup(`<b>${restaurant.restaurant.name}</b><br/>${restaurant.restaurant.cuisines}<br/>Rating ${restaurant.restaurant.user_rating.aggregate_rating}`).openPopup()
    })
}

    componentDidMount() {
        this.getRestaurants()
        this.props.refreshState()
      
    }
    
    componentDidUpdate () {
        console.log(this.state.data)
    }

    render() {
        return (
            <div>
                <p>Results</p>
                <div id="mapid"></div>
                
                {this.state.data && this.state.data.data.restaurants.map((restaurant) => { 
                    return (
                <Restaurant res = {restaurant.restaurant} /> ) })}
            </div>
        )
    }
}

export default Search;