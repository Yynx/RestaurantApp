import React from "react";
import axios from "axios";

class Search extends React.Component {
    
    state = {
        data : null
    }

    getRestaurants = () => {
        const headers = {
            'user-key': "89313d2549eb39affea00277f30d405d"
        }

        let url;

        if (this.props.latitude && this.props.longitude) {
            url=`https://developers.zomato.com/api/v2.1/search?lat=${this.props.latitude}&lon=${this.props.longitude}`
        } else if (this.props.searchKeyword) {
            url=`https://developers.zomato.com/api/v2.1/search?q=${this.props.searchKeyword}`
        }
     
        axios.get(url, {headers})
        .then(response => this.setState({data : response}))
    }

    componentDidMount() {
        this.getRestaurants()
    }
    
    componentDidUpdate () {
        console.log(this.state.data)
    }

    render() {
        return (
            <div>
                <p>Results</p>
            </div>
        )
    }
}

export default Search;