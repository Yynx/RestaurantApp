import React from 'react';

function Restaurant(props) {
    return (
            <div class="card">
            <header class="card-header">
            <p class="card-header-title">
            {props.res.name}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
            </a>
            </header>
            <div class="card-content">
            <div class="content">
            <p>Location: {props.res.location.address}</p>
            <p>Cuisines: {props.res.cuisines}</p>
            <p>Opening hours: {props.res.timings}</p>
            <p>Menu url: {props.res.menu_url}</p>
            <p>Cost for two: {props.res.currency}, {props.res.average_cost_for_two}</p>
            <p>Price range: {props.res.price_range}</p>
            <p>User ratings: {props.res.user_rating.aggregate_rating}</p>
            <p>Has online delivery: {props.res.has_online_delivery}</p>
            <p>Is delivering now: {props.res.is_delivering_now}</p>
            <p>Highlights: {props.res.highlights.map(highlight => highlight)}</p>
            </div>
            </div>
            <footer class="card-footer">
            <a href="#" class="card-footer-item">Add to Favourites</a>
            </footer>

        </div>
    )
}

export default Restaurant;
