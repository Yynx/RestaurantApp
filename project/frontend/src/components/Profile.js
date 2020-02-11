import React from "react";
import axios from "axios";
import Favourite from "./Favourite";

class Profile extends React.Component {
    state = {
       data : null
    }

    getUsersFavourites = () => {
        let token = localStorage.getItem("token")
        let id = localStorage.getItem("id")
        if (token && id){
        axios.get("http://localhost:8000/api/v1/favourites", {headers: {Authorization: `JWT ${token}`}})
        .then((response) => this.setState({data: response.data}))
        .catch((error) => console.log(error))
        } else{
            alert('You must be logged in to save!')
        }
     }

     componentDidMount(){
         this.getUsersFavourites()
     }

     componentDidUpdate(){
         console.log(this.state.data)
     }
  
    render() {

        return (
            <div>
               {this.state.data && this.state.data.map((item) => <Favourite id={item.res_id}/>)}
            </div>
        )
    }
}

export default Profile;