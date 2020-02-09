import React from "react";
import axios from "axios";
class Login extends React.Component {
    componentDidMount() {
        console.log('hey')
        axios.post('http://localhost:8000/api/v1/users/login', {'username': 'user2', 'password': 'abc'}).then((response) => {
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
        }).catch((error) => console.log(error))
    }
    render() {
        let token = localStorage.getItem('token') || null
        return (
            <div>
                Login
                <button onClick={() => localStorage.removeItem('token')}>Logout</button>
            </div>
        )
    }
}

export default Login;