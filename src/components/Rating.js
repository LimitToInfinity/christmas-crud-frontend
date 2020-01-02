import React, { Component } from "react";

import RatingForm from "./RatingForm";

class Rating extends Component {

    state = { isClicked: false }

    handleClick = (event) => {
        const { isClicked } = this.state;
        const { textContent } = event.target;

        if (textContent !== "delete") {
            this.setState({ isClicked: !isClicked });
        }
    };

    render() {
        const { isClicked } = this.state;
        const { rating,  present_id, updateRating,
            deleteRating
        } = this.props;

        return (
            <>
                {isClicked
                    ? (<RatingForm 
                        stars={ rating.stars }
                        description={ rating.description }
                        id={ rating.id }
                        present_id={ present_id }
                        addOrEditRating={ updateRating }
                        handleClick={ this.handleClick }
                    />)
                    : (<div className="rating" onClick={ this.handleClick }>
                        <p>{ rating.stars }</p>
                        <p>{ rating.description }</p>
                        <button 
                            onClick={ () => deleteRating({ ...rating, present_id }) }
                        >
                            delete
                        </button>
                    </div>)
                }
            </>
        );
    }
}

export default Rating;
