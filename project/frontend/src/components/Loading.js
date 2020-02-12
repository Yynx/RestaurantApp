import React from 'react'

const Loading = (props) => {

    console.log(props.loading)

    let active;

    if (props.loading === true) {
        active = 'is-active';
    } else {
        active = '';
    }

    return (
        <div className={`loader-wrapper ${active}`}>
            <h3>Loading...</h3>
            <div className="loader is-loading"></div>
        </div>
    )
}

export default Loading;
