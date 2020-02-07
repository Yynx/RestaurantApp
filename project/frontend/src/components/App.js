import React from "react";
import ReactDOM from "react-dom";

const App = () => (
    <React.Fragment>
        <div>Welcome to our project!</div>
    </React.Fragment>
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;