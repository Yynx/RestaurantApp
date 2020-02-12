import React from 'react';
import axios from 'axios';

class Restaurant extends React.Component {
   
     saveToFavourites = () => {
        let token = localStorage.getItem("token")
        //let id = localStorage.getItem("id")
        if (token){
        axios.post("http://localhost:8000/api/v1/favourites", {res_id: this.props.res.id}, {headers: {Authorization: `JWT ${token}`}})
        .then((response) => alert('You saved!'))
        .catch((error) => console.log(error))
        } else{
            alert('You must be logged in to save!')
        }
     }

    render() {
        console.log(this.props.res.id)
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
                <p>Highlights: {this.props.res.highlights.map(highlight => highlight)}</p>
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
