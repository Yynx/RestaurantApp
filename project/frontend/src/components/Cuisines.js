import React from 'react';

const Cuisines = (props) => {
    let {handleCuisineChange, cusineResults} = props
    let matchingCusines = [];
    if (cusineResults){
    for(let i = 0; i < props.cuisines.length; i++){
        if(cusineResults[0].hasOwnProperty(props.cuisines[i].cuisine.cuisine_name)){
            let cuisineObj = {
                cuisine_name:props.cuisines[i].cuisine.cuisine_name , 
                cuisine_id: props.cuisines[i].cuisine.cuisine_id,
                results: cusineResults[0][props.cuisines[i].cuisine.cuisine_name]}
            matchingCusines.push(cuisineObj)
         } 
      }
    }
    return(
     <ul class="menu-list">
         <li><a
        name=""
         onClick={event => handleCuisineChange(event)}
         >All</a></li>
     {matchingCusines.map(cuisine => {
         return(<li><a
        name={cuisine.cuisine_id}
         onClick={event => handleCuisineChange(event)}
         >{cuisine.cuisine_name} <b>{cuisine.results}</b></a></li>)
     })}
     </ul> 
    )
    
}

export default Cuisines