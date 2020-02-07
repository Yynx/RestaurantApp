import React from "react";
import axios from "axios";

class Results extends React.Component {
    
    state = {
        data : null
    }

    getRestaurants = () => {
        const headers = {
            'user-key': "89313d2549eb39affea00277f30d405d"
        }
    
        axios.get("https://developers.zomato.com/api/v2.1/search?lat=51.509865&lon=-0.118092", {headers})
        .then(response => this.setState({data : response}))
    }

    componentDidMount() {
        this.getRestaurants()
    }

    render() {
        return (
            <div>
                <p>Results</p>
            </div>
        )
    }
}

export default Results;