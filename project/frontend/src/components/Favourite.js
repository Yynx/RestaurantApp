import React from 'react';
import axios from 'axios';

class Favourite extends React.Component {
    state = {
        data: null
    }
   
     getRestaurantInfo = () => {
        const headers = {
            'user-key': "89313d2549eb39affea00277f30d405d"
        }

        axios.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.props.id}`, {headers})
        .then((response) => this.setState({data: response.data}))
        .catch((error) => error)
     }

     deleteFromFavourites = () => {
        let token = localStorage.getItem("token")
        if (token){
        axios.delete(`http://localhost:8000/api/v1/favourites/${this.props.fav_id}/`, {headers: {Authorization: `JWT ${token}`}})
        .then((response) => this.props.getUsersFavourites())
        .catch((error) => error)
        } else {
            alert('You must be logged in')
        }
     }

     componentDidMount(){
         this.getRestaurantInfo()
     }


    render() {
        return (
            <div> {this.state.data && <div class="card">
            <header class="card-header">
            <p class="card-header-title">
            {this.state.data.name}
            </p>
            </header>
            <div class="card-content">
            <div class="content">
            <div class="flex">
            <p className="flex-info">Location<br/><b>{this.state.data.location.address}</b></p>
            <p className="flex-info">Cuisines<br/><b>{this.state.data.cuisines}</b></p>
            <p className="flex-info">Cost for two<br/><b>{this.state.data.currency}{this.state.data.average_cost_for_two}</b></p>
            <p className="flex-info">User ratings<br/><b>{this.state.data.user_rating.aggregate_rating}</b></p>
            <p className="flex-info">Has online delivery<br/>{this.state.data.has_online_delivery === 0 ? <i class="far fa-times-circle"></i> :<i class="far fa-check-circle"></i>}</p>
            <p className="flex-info">Is delivering now<br/><b>{this.state.data.is_delivering_now  === 0 ?  <i class="far fa-times-circle"></i> :<i class="far fa-check-circle"></i>}</b></p>
            <br/>
            <div class="tags">
            <span class="tag is-primary">Highlights</span>
            {this.state.data.highlights.map((highlight) => {return <span className="tag">{highlight}</span>})}
            </div>
            </div>

            <p className="align-text padding-top">Opening hours<br/><b>{this.state.data.timings}</b></p>
            <div></div>
            
            <br/>
            <div className="photo-gallery"> 
            {this.state.data.photos  && this.state.data.photos.map((photo, index) => {
             return (<img className="res-photos" src={photo.photo.thumb_url} alt={`${this.state.data.name} ${index}`}/>)
            })
            } 
            </div>
            </div>
            </div>

            <footer class="card-footer">
            <a onClick={this.deleteFromFavourites} class="card-footer-item">Delete</a>
            </footer>

    </div>}
   </div>
                
    )
}
}

export default Favourite;
