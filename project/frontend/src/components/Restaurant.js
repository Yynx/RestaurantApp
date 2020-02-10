import React from 'react';

function Restaurant(props) {
    return (
        <div>
            <p>Name: {props.res.name}</p>
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
    )
}

export default Restaurant;
