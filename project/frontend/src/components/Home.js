import React from "react";
import '../css/style.css';

class Home extends React.Component {
    state = {
        searchKeyword:  null,
        latitude : null,
        longitude: null,
        error: null
    }

    handleChange = (event) => {
        const {value, name} = event.target
      this.setState({[name] : value})
    }

    geoOptions = {
        enableHighAccuracy: true, 
        timeout: 5000,
        maxiumAge: 0
    }
    getGeoPositionSuccess = (position) => {
        const crd = position.coords;
          this.setState({latitude: crd.latitude})
          this.setState({longitude: crd.longitude})
    }

    getGeoPositionError = (error) => {
        this.setState({error: [error.code, error.message]})
    }

    getGeoPosition = () => {
        navigator.geolocation.getCurrentPosition(this.getGeoPositionSuccess, this.getGeoPositionError, this.geoOptions);
    }


    render() {
        console.log(this.state.searchKeyword)
        console.log(this.state.latitude)
        console.log(this.state.longitude)
        console.log(this.state.error)
        return (
            <div className="container flex-center">
                <form className="form">
                   
                    <label className="label home-label">Find somewhere to eat.</label>
                    <div className="flex-row">
                        <div className="control has-icons-left input-div">
                            <input className="input"  type="text" name="searchKeyword" onChange={this.handleChange} placeholder="79 Borough Road" />
                                <span className="icon is-small is-left">
                                <i class="fas fa-search"></i>
        
                                </span>
                        </div>
                        <button className="button is-primary margin">Search</button>
                    <button className="button is-info margin" onClick={this.getGeoPosition}><i className="fas fa-map-marker-alt"></i>  Near me</button>
               
                    </div>
                    
                    
                  
                    

                </form>

            </div>
        )
    }
}

export default Home;