import React from "react";
import axios from "axios";
import Favourite from "./Favourite";
import Loading from "./Loading";

class Favourites extends React.Component {
    state = {
       data : null,
       loading: true,
       noData: null
    }

    getUsersFavourites = () => {
        let token = localStorage.getItem("token")
        if (token){
        axios.get("http://localhost:8000/api/v1/favourites", {headers: {Authorization: `JWT ${token}`}})
        .then((response) => 
        {response.data.length === 0 ? this.setState({ noData : true }) : null
        this.setState({data: response.data})})
        .catch((error) => error)
        } else {
            alert('You must be logged in to save!')
        }
     }


     componentDidMount(){
         this.getUsersFavourites()
     }

     componentDidUpdate(){
        // console.log(this.state.data)
     }
  
     errorMessage = () => {
      return (
        <section className="hero is-primary">
        
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Nothing to show
              </h1>
              <h2 className="subtitle">
                Go to the find tab, to search for a restaurant and add to your favourites!
              </h2>
            </div>
          </div>
        </section> 
      )}

    render() {

        return (
            <div className="container">
                <h3>Profile</h3>
                <h3 className="has-text-primary">{this.props.username}</h3>
               {this.state.data ? this.state.data.map((item) => <Favourite key={item.res_id} fav_id={item.id} id={item.res_id} getUsersFavourites={this.getUsersFavourites} />) : null}
               {this.state.noData === true ? this.errorMessage() : null}
               {this.state.loading ? <Loading loading={this.state.loading} /> : null}
            </div>
        )
    }
}

export default Favourites;