import React from "react";
import axios from "axios";
class Login extends React.Component {

    state = {
        username: null,
        password: null,
        email: null
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    handleSubmit = () => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/v1/users/login', {username : this.state.username, password: this.state.password })
        .then((response) => {
            //console.log(response.data)
            localStorage.setItem('token', response.data.token)
      
            this.props.setUsername(response.data.username)
            
            }).catch((error) => error)
    }

    render() {
        let token = localStorage.getItem('token') || null

        return (
            <div className="form-div">
                <form className="user-form" onSubmit={this.handleSubmit}>
                    <h3>Login</h3>
                    <input className="input input-m"onChange={this.handleChange} type="text" name="username" placeholder="Enter your username"></input>
                    <input className="input input-m" onChange={this.handleChange} type="password" name="password" placeholder="Enter your password"></input>
                    <button className="button is-success input-m">Log in</button>
                </form>
            </div>
        )
    }
}

export default Login;