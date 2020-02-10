import React from "react";

class Home extends React.Component {
    render() {
        return (
            <div class="container">

                <form class="columns is-vcentered is-centered is-mobile level-item">
                        <label class="label">Find somewhere to eat:</label>

                    <div class="field level-left">
                        <div class="control has-icons-left">
                            <input class="input" type="text" placeholder="79 Borough Road" />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-map-marker-alt"></i>
                                </span>
                        </div>
                        <button class="button is-primary level-right">Search</button>
                    </div>

                </form>

            </div>
        )
    }
}

export default Home;