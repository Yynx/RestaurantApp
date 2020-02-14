import React from "react";
import axios from "axios";

class Signup extends React.Component {
    state = {
        username: null,
        password: null,
        password2: null,
        email: null,
        usernameError: null,
        emailError: null
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
                this.setState({usernameError: null, emailError: null})
                alert("You can now log in.")
                history.push('/login')
            })
            .catch((error)=> {
                error.response.data.username ? this.setState({usernameError: error.response.data.username}) :
                this.setState({usernameError: null})
                error.response.data.email ? this.setState({emailError: error.response.data.email}) : this.setState({emailError: null})
            })
        }
    }

    render() {

        return (
            <div className="form-div">
                <form className="user-form" onSubmit={this.handleSubmit}>
                <h3>Sign up</h3>
                    <input className="input input-m" onChange={this.handleChange} type="text" name="username" placeholder="Create a username" minLength="3" maxLength="25" required></input>
                    {this.state.usernameError && <p className="align-text error-msg">{this.state.usernameError}</p>}
                    <input className="input input-m" onChange={this.handleChange} type="password" name="password" placeholder="Create a password" minLength="6" maxLength="20" required></input>
                    <input className="input input-m" onChange={this.handleChange} type="password" name="password2" placeholder="Please repeat your password" required></input>
                    <input className="input input-m" onChange={this.handleChange} type="email" name="email" placeholder="Enter your email address" maxLength="50" required></ input>
                    {this.state.emailError && <p className="align-text error-msg">{this.state.emailError}</p>}
                    <button className="button is-success input-m">Sign up</button>
                </form>
            </div>
        )
    }
}

export default Signup;