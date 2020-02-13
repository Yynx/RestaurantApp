import React from "react";
import axios from "axios";

class Signup extends React.Component {
    state = {
        username: null,
        password: null,
        password2: null,
        email: null
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    handleSubmit = () => {
        event.preventDefault();

        if (this.state.password !== this.state.password2) {
            alert("Your passwords do not match!")
        } else {
            let {history} = this.props
            axios.post("http://localhost:8000/api/v1/users", {username: this.state.username, password: this.state.password, email: this.state.email})
            .then(response => {
                alert("You can now log in.")
                history.push('/login')
            })
            .catch((err)=> err)
        }
    }

    render() {

        return (
            <div className="form-div">
                <form className="user-form" onSubmit={this.handleSubmit}>
                <h3>Sign up</h3>
                    <input className="input input-m" onChange={this.handleChange} type="text" name="username" placeholder="Create a username"></input>
                    <input className="input input-m" onChange={this.handleChange} type="password" name="password" placeholder="Create a password"></input>
                    <input className="input input-m" onChange={this.handleChange} type="password" name="password2" placeholder="Please repeat your password"></input>
                    <input className="input input-m" onChange={this.handleChange} type="email" name="email" placeholder="Enter your email address"></input>
                    <button className="button is-success input-m">Sign up</button>
                </form>
            </div>
        )
    }
}

export default Signup;