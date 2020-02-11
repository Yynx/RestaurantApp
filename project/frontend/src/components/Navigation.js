import {Link} from "react-router-dom";
import React from 'react';
import logo from '../images/foogle.png';

const Navigation = (props) => {
  document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation" >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} alt="foogle-logo" width="auto" height="28" />
        </Link>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to ="/">
            Find
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
            </a>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/share">
                Share
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
              <hr className="navbar-divider" />
              <Link className="navbar-item" to="/about">
                About
              </Link>
            </div>
          </div>
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