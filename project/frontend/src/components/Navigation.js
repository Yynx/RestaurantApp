import {Link} from "react-router-dom";
import React, { Fragment } from 'react';
import {Navbar} from 'react-bulma-components';

const Navigation = () => {
    return (
        <Navbar
        color="white"
        fixed="top"
        active="false"
        transparent="false"
      >
        <Navbar.Brand>
          <Link className={"navbar-item"}to="/">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
          </Link>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu >
          <Navbar.Container>
           <Link className={"navbar-item"}to="/">
               Home
           </Link>
           <Link className={"navbar-item"}to="/results">
               Results
           </Link>
           <Link className={"navbar-item"}to="/profile">
               Profile
           </Link>
           <Link className={"navbar-item"}to="/login">
               login
           </Link>
           <Link className={"navbar-item"}to="/signup">
               Sign up
           </Link>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
  )
}

export default Navigation