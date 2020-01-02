import React, { Component } from "react";

class RatingForm extends Component {

    state = {
        description: this.props.description || "",
        stars: this.props.stars || "",
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { present_id, addOrEditRating, id, 
            handleClick
        } = this.props;

        addOrEditRating({ ...this.state, present_id, id });

        if (handleClick) { handleClick(event); }

        this.setState({ description: "", stars: "" });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { description, stars } = this.state;
        const { id } = this.props;

        return (
            <form className="add-rating" onSubmit={ this.handleSubmit }>
                <input 
                    onChange={ this.handleChange }
                    type="text"
                    name="description"
                    value={ description }
                    placeholder="enter a description"
                />
                <input 
                    onChange={ this.handleChange }
                    type="number"
                    name="stars"
                    value={ stars }
                    placeholder="rating"
                />
                <input 
                    type="submit"
                    value={ id ? "change rating" : "add rating" }
                />
            </form>
        );
    }
}

export default RatingForm;