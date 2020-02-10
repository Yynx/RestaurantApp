import React from "react";
import '../css/style.css';

class Home extends React.Component {

    render() {
        return (
            <div className="container flex-center">
                <form className="form" onSubmit={this.props.handleSubmit}>
                   
                    <label className="label home-label">Find somewhere to eat.</label>
                    <div className="flex-row">
                        <div className="control has-icons-left input-div">
                            <input className="input"  type="text" name="searchKeyword" onChange={this.props.handleChange} placeholder="79 Borough Road" />
                                <span className="icon is-small is-left">
                                <i class="fas fa-search"></i>
        
                                </span>
                        </div>
                        <button className="button is-primary margin">Search</button>
                    <button className="button is-info margin" onClick={(event)=> this.props.getGeoPosition(event)}><i className="fas fa-map-marker-alt"></i>Near me</button>
               
                    </div>

                </form>

            </div>
        )
    }
}

export default Home;