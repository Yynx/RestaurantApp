import React from "react";
import axios from "axios";
class Login extends React.Component {

    state = {
        username: null,
        password: null,
        email: null,
        error: null
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    handleSubmit = () => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/v1/users/login', {username : this.state.username, password: this.state.password })
        .then((response) => {
            
            localStorage.setItem('token', response.data.token)
           
            this.props.setUsername(response.data.username)
            
            this.setState({error: null})
            }).catch((error) => {
                let {non_field_errors} = error.response.data
                if(non_field_errors){
                   non_field_errors == "This username or email is not valid" ? this.setState({error: "This username is not valid"}) : this.setState({error: non_field_errors})
                }
            })
    }

    render() {
        let token = localStorage.getItem('token') || null

        return (
            <div className="form-div">
                <form className="user-form" onSubmit={this.handleSubmit}>
                    <h3>Login</h3>
                    <input className="input input-m"onChange={this.handleChange} type="text" name="username" placeholder="Enter your username"></input>
                    <input className="input input-m" onChange={this.handleChange} type="password" name="password" placeholder="Enter your password"></input>
                    {this.state.error && <p className="align-text error-msg">{this.state.error}</p>}
                    <button className="button is-success input-m">Log in</button>
                </form>
            </div>
        )
    }
}

export default Login;