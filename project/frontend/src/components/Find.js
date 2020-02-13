import React from "react";
import '../css/style.css';
import axios from "axios";

class Find extends React.Component {

    state = {
        randomImage: null
    }

    getRandomImage = () => {
        axios.get("https://source.unsplash.com/featured/1600x900/?food,restaurant,cafe")
        .then(response => this.setState({ randomImage: response.request.responseURL }))
    }
    
    componentDidMount () {
        this.getRandomImage();
    }
    
    render() {
        const backgroundImage = {
            backgroundImage: `url(${this.state.randomImage})`,
            backgroundColor: 'grey',
            width: '100vw',
            height: '50vh',
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
        }

        return (
            <div className="container flex-center">
                <form className="form" onSubmit={this.props.handleSubmit}>
                   
                    <label className="label home-label">Find somewhere to eat.</label>
                    <div className="flex-row">
                        <div className="input-div">
                    <div className="control has-icons-left stretch">
                            <input className="input"  type="text" name="searchKeyword" onChange={this.props.handleChangeKeyword} placeholder="Sushi" />
                                <span className="icon is-small is-left">
                                <i class="fas fa-search"></i>
        
                                </span>
                        </div>
                        <div className="control has-icons-left stretch">
                            <input className="input"  type="text" name="searchLocation" onChange={this.props.handleChangeLocation} placeholder="79 Borough Road" />
                                <span className="icon is-small is-left">
                                <i class="fas fa-map-marked-alt"></i> 
                                </span>
                                <p>{this.props.match}</p>
                        </div>
                        </div>
                        <button className="button is-primary margin" name="search">Search</button>
                    <button className="button is-info margin" name="nearMe" onClick={(event)=> this.props.getGeoPosition(event)}><i className="fas fa-map-marker-alt"></i>Near me</button>
               
                    </div>

                </form>
            <div style={backgroundImage}>
                <p>hi</p>
            </div>
            </div>
        )
    }
}

export default Find;