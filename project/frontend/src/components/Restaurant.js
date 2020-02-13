import React from 'react';
import axios from 'axios';

class Restaurant extends React.Component {

    state = {
        showPhotos: false,
        error: false
    }

     saveToFavourites = () => {
        let token = localStorage.getItem("token")
        if (token){
        axios.post("http://localhost:8000/api/v1/favourites", {res_id: this.props.res.id}, {headers: {Authorization: `JWT ${token}`}})
        .then((response) => response)
        .catch((error) => 
        {   if(error.response.status === 401){
               this.setState({error:'You must be logged in to save'})
        } else {
            this.setState({error:'You have already added this'})
        }
             
     } )
        } else{
            this.setState({error:'You must be logged in to save'})
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
                </header>
                <div class="card-content">
                <div class="content">
                <div class="flex">
                <p className="flex-info">Location: {this.props.res.location.address}</p>
                <p className="flex-info">Cuisines: {this.props.res.cuisines}</p>
                <p className="flex-info">Cost for two: {this.props.res.currency}, {this.props.res.average_cost_for_two}</p>
                <p className="flex-info">User ratings: {this.props.res.user_rating.aggregate_rating}</p>
                <p className="flex-info">Has online delivery: {this.props.res.has_online_delivery}</p>
                <p className="flex-info">Is delivering now: {this.props.res.is_delivering_now}</p>
                <div class="tags">
                {this.props.res.highlights.map((highlight) => {return <span className="tag">{highlight}</span>})}
                </div>
                </div>
                <p>Opening hours: {this.props.res.timings}</p>
                 {this.props.res.photos && <a onClick={() => this.handleClick()} >Show Photos</a>}
                 {!this.state.showPhotos && this.props.res.photos && <img src={this.props.res.photos[0].photo.thumb_url} alt={`${this.props.res.name}`}/>} 
                {this.state.showPhotos  && this.props.res.photos.map((photo, index) => {
                 return (<img src={photo.photo.thumb_url} alt={`${this.props.res.name} ${index}`}/>)
                })
                } 
                </div>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
                <footer class="card-footer">
                <a onClick={this.saveToFavourites} class="card-footer-item">Add to Favourites</a>
                </footer>

        </div>
        
    )
}
}

export default Restaurant;
