import React from 'react';

import RatingForm from "./RatingForm";
import Rating from './Rating';

function Present({ present, createRating, updateRating, deleteRating }) {

    const createRatings = () => {
        return present.ratings.sort(highToLow).map(rating => {
            return (
                <Rating
                    key={ rating.id }
                    rating={ rating }
                    updateRating={ updateRating }
                    present_id={ present.id }
                    deleteRating={ deleteRating }
                />
            );
        });
    };

    return (
        <div className="present">
            <h2>{ present.name }</h2>
            <img alt={ present.name } src={ present.image } />
            { createRatings() }
            
            <RatingForm 
                present_id={ present.id }
                addOrEditRating={ createRating }
            />
        </div>
    );
}

function highToLow(a, b) {
    if (a.stars > b.stars) { return -1; }
    else if (a.stars < b.stars) { return 1; }
    else { return 0; }
}

export default Present;
