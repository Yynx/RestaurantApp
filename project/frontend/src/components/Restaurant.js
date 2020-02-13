import React from 'react';
import axios from 'axios';

class Restaurant extends React.Component {

    state = {
        showPhotos: false
    }

     saveToFavourites = () => {
        let token = localStorage.getItem("token")
        if (token){
        axios.post("http://localhost:8000/api/v1/favourites", {res_id: this.props.res.id}, {headers: {Authorization: `JWT ${token}`}})
        .then((response) => response)
        .catch((error) => alert('You have already added this to your Favourites list.'))
        } else{
            alert('You must be logged in to save.')
        }
     }

     handleClick = (event) => {
        this.setState({showPhotos: !this.state.showPhotos})
     }

    render() {
        return (
                <div class="card">
                <header class="card-header">
                <p class="card-header-title">
                {this.props.res.name}
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </a>
                </header>
                <div class="card-content">
                <div class="content">
                <p>Location: {this.props.res.location.address}</p>
                <p>Cuisines: {this.props.res.cuisines}</p>
                <p>Opening hours: {this.props.res.timings}</p>
                <p>Menu url: {this.props.res.menu_url}</p>
                <p>Cost for two: {this.props.res.currency}, {this.props.res.average_cost_for_two}</p>
                <p>Price range: {this.props.res.price_range}</p>
                <p>User ratings: {this.props.res.user_rating.aggregate_rating}</p>
                <p>Has online delivery: {this.props.res.has_online_delivery}</p>
                <p>Is delivering now: {this.props.res.is_delivering_now}</p>
                <p>Highlights: {this.props.res.highlights.map((highlight) => highlight)}</p>
                 <a onClick={() => this.handleClick()} >Show Photos</a> 
                 {!this.state.showPhotos && <img src={this.props.res.photos[0].photo.thumb_url} alt={`${this.props.res.name}`}/>} 
                {this.state.showPhotos && this.props.res.photos.map((photo, index) => {
                 return (<img src={photo.photo.thumb_url} alt={`${this.props.res.name} ${index}`}/>)
                })
                } 
                </div>
                </div>
                <footer class="card-footer">
                <a onClick={this.saveToFavourites} class="card-footer-item">Add to Favourites</a>
                </footer>

        </div>
        
    )
}
}

export default Restaurant;
