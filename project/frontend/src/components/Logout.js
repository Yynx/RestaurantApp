import React from "react";

const Logout = (props) => {

    return (
        <div>
            <p>Are you sure you want to log out?</p>
            <button onClick={() => { 
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            props.logOut()}}>Yes</button>
        </div>
    )
}

export default Logout;