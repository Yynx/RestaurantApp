import React from "react";
import axios from "axios";
import Restaurant from "./Restaurant";
import mapIcon from "../images/pin.png";

class Results extends React.Component {
    
    state = {
        data : null,
        mymap : null,
        layerGroup: null
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

        // let newYork = 'https://developers.zomato.com/api/v2.1/search?lat=40.7128&lon=74.0060'
     
        axios.get(url, {headers})
        .then(response => this.setState({data : response}, () => this.leaflet()))
    }

    leaflet = () => {

    let {layerGroup} = this.state
    let posMarker = L.marker([this.props.latitude, this.props.longitude]).addTo(layerGroup)
    posMarker.bindPopup(`<b>Finding places near here!</b>`).openPopup()
    this.state.data.data.restaurants.map((restaurant) => { 
    let marker = L.marker([restaurant.restaurant.location.latitude, restaurant.restaurant.location.longitude]).addTo(layerGroup)
    marker.bindPopup(`<b>${restaurant.restaurant.name}</b><br/>${restaurant.restaurant.cuisines}<br/>Rating ${restaurant.restaurant.user_rating.aggregate_rating}`)
    this.setState({layerGroup: layerGroup})
    })
}

    createMap = () => {
        let mymap = L.map('mapid').setView([51.505, -0.09], 13);
        const accessToken = 'pk.eyJ1IjoibGF3Y2FrZSIsImEiOiJjazZnb3c3enUwOTg1M2pwOHJmcXNjdnNyIn0.2R2s_StXtwU8C8jDiQAXnA'
            L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: accessToken
            }).addTo(mymap);
        let layerGroup = L.layerGroup().addTo(mymap)
        
        this.setState({mymap: mymap, layerGroup: layerGroup})
    }

    
    componentDidMount() {
        this.createMap()
        this.getRestaurants()
        this.props.refreshState()
      
    }
    
    componentDidUpdate () {
        //console.log(this.state.data)
    }

    sortBy = (event) => {
        const headers = {
            'user-key': "89313d2549eb39affea00277f30d405d"
        }
        let sortQuery = event.target.name;
        let url;

        if (this.props.latitude && this.props.longitude && this.props.searchKeyword) {
            url=`https://developers.zomato.com/api/v2.1/search?q=${this.props.searchKeyword}&lat=${this.props.latitude}&lon=${this.props.longitude}&sort=${sortQuery}`
        } else if (this.props.latitude && this.props.longitude) {
            url=`https://developers.zomato.com/api/v2.1/search?lat=${this.props.latitude}&lon=${this.props.longitude}&sort=${sortQuery}`
        }

        axios.get(url, {headers})
        .then(response => {
            let {layerGroup} = this.state
            layerGroup.clearLayers();
            this.setState({data : response, 
                          layerGroup: layerGroup
                          }, () => this.leaflet()
                          )
            })

        event.preventDefault();
        //console.log(sortQuery)
    }

    render() {
        return ( 
            <div>
                <div id="mapid"></div>
                <div class="columns">
                <aside class="menu column is-one-fifth">
                    <p class="menu-label">
                        Sort by:
                    </p>
                    <ul class="menu-list">
                        <li><a name="rating" onClick={(event) => this.sortBy(event)}>Rating</a></li>
                        <li><a name="cost" onClick={(event) => this.sortBy(event)}>Cost</a></li>
                        <li><a name="real_distance" onClick={(event) => this.sortBy(event)}>Distance</a></li>
                    </ul>
                </aside>

                <div class="column">
                
                {this.state.data && this.state.data.data.restaurants.map((restaurant) => { 
                    return (
                <Restaurant res = {restaurant.restaurant} /> ) })}
                </div>

                </div>
                
            </div>
        )
    }
}

export default Results;