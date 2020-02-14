import React from "react";

const Logout = (props) => {
        
    return (
        <div class="logout-card">
            <div class="card width-30">
                <div class="card-content">
                    <div class="content">
                    Are you sure you want to log out?
                    </div>
                </div>

                <footer class="card-footer">
                    <button class="card-footer-item" onClick={() => { 
                    localStorage.removeItem('token')
                    props.logOut()}}>Yes</button>
                </footer>
            </div>
        </div>
    )
}

export default Logout;