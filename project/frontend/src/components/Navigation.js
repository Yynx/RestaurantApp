import {Link} from "react-router-dom";
import React from 'react';
import logo from '../images/foogle.png';

const Navigation = (props) => {
  const [isActive, setisActive] = React.useState(false);

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation" >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} alt="foogle-logo" width="auto" height="28" />
        </Link>
        <a onClick={() => {
              setisActive(!isActive);
            }}
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample" >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to ="/">
            Find
          </Link>
          {props.loggedIn ?
          <Link className="navbar-item" to="/favourites">
         My Favourites
          </Link> : null}
          </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-primary" to="/signup">
                <strong>Sign up</strong>
              </Link>
              {props.loggedIn ? <Link className="button is-light" to="/logout">Log out</Link> : <Link className="button is-light" to="/login">Log In</Link>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation