import React from "react";
import axios from "axios";
import Restaurant from "./Restaurant";
import Cuisines from "./Cuisines";

class Results extends React.Component {
    
    state = {
        data : null,
        mymap : null,
        layerGroup: null,
        sort: '',
        order: 'real_distance',
        cuisines: null,
        cuisine: ''
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
        axios.get(url, {headers})
        .then(response => this.setState({data : response}, () => this.leaflet()))
    }

    getCuisines = () => {
        const headers = {
            'user-key': "89313d2549eb39affea00277f30d405d"
        }
        let url=`https://developers.zomato.com/api/v2.1/cuisines?&lat=${this.props.latitude}&lon=${this.props.longitude}`
        axios.get(url, {headers})
        .then(response => this.setState({cuisines : response.data.cuisines})
        )
           
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
        this.getCuisines()
        this.props.refreshState()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.order !== this.state.order || prevState.sort !== this.state.sort || prevState.cuisine !== this.state.cuisine){
            this.filterResults()
        }
    }
    

    filterResults = () => {
    const headers = {
    'user-key': "89313d2549eb39affea00277f30d405d"
    }
    let cuisineString = this.state.cuisine !== '' ?  `&cuisines=${this.state.cuisine}` : ''
    let sortString = this.state.sort !== '' ?  `&sort=${this.state.sort}` : ''
    let orderString = this.state.order !== '' ?  `&order=${this.state.order}` : ''
    let url=`https://developers.zomato.com/api/v2.1/search?q=${this.props.searchKeyword}&lat=${this.props.latitude}&lon=${this.props.longitude}${cuisineString}${sortString}${orderString}`
    axios
    .get(url, {headers})
    .then(response => {
        let {layerGroup} = this.state
        layerGroup.clearLayers()
        this.setState({
            data : response,
            layerGroup: layerGroup}, () => this.leaflet())})
    }

    handleOrderChange = (event) => {
        const {name} = event.target
        this.setState({
          order: name
        });
    }

    handleSortChange = (event) => {
        const {name} = event.target
        this.setState({
          sort: name
        });
    }


    handleCuisineChange = (event) => {
        const {name} = event.target
        this.setState({
          cuisine: name
        });
    }

    filterByCuisine = () => {
        let cuisinesObj = new Object()
        let cusineResults = this.state.data ? this.state.data.data.restaurants.map((item) => {
            let cuisinesStr = item.restaurant.cuisines
            let cuisinesArray = cuisinesStr.split(',')
            for(let i = 0; i < cuisinesArray.length; i++ ){
                let cuisine = cuisinesArray[i].trim()
               if(cuisinesObj.hasOwnProperty(cuisine)){
                   cuisinesObj[`${cuisine}`] += 1
               } else {
                   cuisinesObj[`${cuisine}`] = 1
               }
            }
            return cuisinesObj
        }) : null
        return cusineResults
    }
    render() {
       let cusineResults = this.filterByCuisine()
        return ( 
            <div>
                <div id="mapid"></div>
                <div class="columns">
                <aside class="menu column is-one-fifth">
                    {this.props.searchKeyword && <h2>Showing results for {this.props.searchKeyword}</h2>}
                    <p class="menu-label">
                        Sort by:
                    </p>
                    <ul class="menu-list">
                    <li>
                    <a
                    name=""
                    onClick={this.handleSortChange}
                    ></a>
                    </li>
                    <li><a 
                    name="cost"
                    onClick={this.handleSortChange}
                    >cost</a>
                    </li>
                    <li><a 
                    name="rating"
                    onClick={this.handleSortChange}                   
                    >rating</a>
                    </li>
                    <li><a
                    name="real_distance"
                    onClick={this.handleSortChange}                    
                    >distance</a></li>
                    </ul>
                    {this.state.sort !== "real_distance"  && <p class="menu-label">
                        Order by:
                    </p>}
                    {this.state.sort !== "real_distance" &&
                    <ul class="menu-list">
                    <li><a
                    name=""
                    onClick={this.handleOrderChange}
                    ></a></li>
                    <li><a
                    name="asc"
                    onClick={this.handleOrderChange}
                    >low to high</a></li>
                    <li><a
                    name="desc"
                    onClick={this.handleOrderChange}
                    >high to low</a></li>
                    </ul> }
                    {this.state.cuisines && <p class="menu-label">Cuisine:</p>}
                    {this.state.cuisines && cusineResults && <Cuisines 
                    cuisines={this.state.cuisines} cusineResults={cusineResults}
                    handleCuisineChange={this.handleCuisineChange} />}
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