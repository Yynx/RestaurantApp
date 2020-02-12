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
        .catch((error) => console.log(error))
     }

     deleteFromFavourites = () => {
        let token = localStorage.getItem("token")
        //let id = localStorage.getItem("id")
        if (token){
        axios.delete(`http://localhost:8000/api/v1/favourites/${this.props.fav_id}/`, {headers: {Authorization: `JWT ${token}`}})
        .then((response) => console.log(response))
        .catch((error) => console.log(response))
        } else{
            alert('You must be logged in')
        }
     }

     componentDidMount(){
         this.getRestaurantInfo()
     }

     componentDidUpdate(){
        // console.log(this.state.data)
         console.log(this.props)
     }

    render() {
        return (
            <div> {this.state.data && <div class="card">
            <header class="card-header">
           <p class="card-header-title">
           {this.state.data.name}
           </p>
           <a href="#" class="card-header-icon" aria-label="more options">
           <span class="icon">
               <i class="fas fa-angle-down" aria-hidden="true"></i>
           </span>
           </a>
           </header>
           <div class="card-content">
           <div class="content">
           <p>Location: {this.state.data.location.address}</p>
           <p>Cuisines: {this.state.data.cuisines}</p>
           <p>Opening hours: {this.state.data.timings}</p>
           <p>Menu url: {this.state.data.menu_url}</p>
           <p>Cost for two: {this.state.data.currency}, {this.state.data.average_cost_for_two}</p>
           <p>Price range: {this.state.data.price_range}</p>
           <p>User ratings: {this.state.data.user_rating.aggregate_rating}</p>
           <p>Has online delivery: {this.state.data.has_online_delivery}</p>
           <p>Is delivering now: {this.state.data.is_delivering_now}</p>
           <p>Highlights: {this.state.data.highlights.map(highlight => highlight)}</p>
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
