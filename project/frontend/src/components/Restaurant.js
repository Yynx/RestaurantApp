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
                <p className="flex-info">Location<br/><b>{this.props.res.location.address}</b></p>
                <p className="flex-info">Cuisines<br/><b>{this.props.res.cuisines}</b></p>
                <p className="flex-info">Cost for two<br/><b>{this.props.res.currency}{this.props.res.average_cost_for_two}</b></p>
                <p className="flex-info">User ratings<br/><b>{this.props.res.user_rating.aggregate_rating}</b></p>
                <p className="flex-info">Has online delivery<br/>{this.props.res.has_online_delivery === 0 ? <i class="far fa-times-circle"></i> :<i class="far fa-check-circle"></i>}</p>
                <p className="flex-info">Is delivering now<br/><b>{this.props.res.is_delivering_now  === 0 ?  <i class="far fa-times-circle"></i> :<i class="far fa-check-circle"></i>}</b></p>
                <br/>
                <div class="tags">
                {this.props.res.highlights.map((highlight) => {return <span className="tag">{highlight}</span>})}
                </div>
                </div>

                <p className="align-text padding-top">Opening hours<br/><b>{this.props.res.timings}</b></p>
                <div></div>
                
                <br/>
                <div className="photo-gallery">
            
                 
                 {!this.state.showPhotos && this.props.res.photos && <img className="res-photos" src={this.props.res.photos[0].photo.thumb_url} alt={`${this.props.res.name}`}/>} 
                {this.state.showPhotos  && this.props.res.photos.map((photo, index) => {
                 return (<img className="res-photos" src={photo.photo.thumb_url} alt={`${this.props.res.name} ${index}`}/>)
                })
                } 
                </div>
                </div>
                </div>
                {this.state.error && <p className="align-text error-msg">{this.state.error}</p>}
                <footer class="card-footer">
                {this.props.res.photos && <a class="card-footer-item" onClick={() => this.handleClick()} >Show Photos</a>}
                <a onClick={this.saveToFavourites} class="card-footer-item">Add to Favourites</a>
                </footer>

        </div>
        
    )
}
}

export default Restaurant;
