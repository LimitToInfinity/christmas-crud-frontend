import React from 'react';

function PresentCard({ present }) {

    const createRatings = () => {
        return present.ratings.map(rating => {
            return (
                <div className="ratings">
                    <p>{ rating.stars}</p>
                    <p>{ rating.description}</p>
                </div>
            );
        })
    }
  
    return (
        <div className="present-card">
            <h2>{ present.name }</h2>
            <img alt={ present.name } src={ present.image } />
            { createRatings() }
        </div>
    );
}

export default PresentCard;
