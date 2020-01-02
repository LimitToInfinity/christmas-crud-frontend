import React, { Component } from 'react';

import './../stylesheets/App.scss';
import Present from './Present';

const presentsURL = "http://localhost:3000/presents/";
const ratingsURL = "http://localhost:3000/ratings";

class App extends Component {

  state = { presents: [] }

  componentDidMount() {
    fetch(presentsURL)
      .then(parseJSON)
      .then(presents => this.setState({ presents: extractData(presents) }));
  }

  createRating = (rating) => {
    const { presents } = this.state;

    const modifiedPresent = findPresent(presents, rating);
    const notModifiedPresents = filterPresents(presents, rating);
    modifiedPresent.ratings.push(rating);
    
    this.setState({ presents: [...notModifiedPresents, modifiedPresent] });

    const body = JSON.stringify(rating);
    fetchCall(ratingsURL, "POST", body);
  };
  
  updateRating = (updatedRating) => {
    const { presents } = this.state;

    const modifiedPresent = findPresent(presents, updatedRating);
    const notModifiedPresents = filterPresents(presents, updatedRating);
  
    const notModifiedRatings = filterRatings(modifiedPresent, updatedRating);
    modifiedPresent.ratings = [...notModifiedRatings, updatedRating]
    
    this.setState({ presents: [...notModifiedPresents, modifiedPresent] });
  
    const updatedRatingURL = `${ratingsURL}/${updatedRating.id}`;
    const body = JSON.stringify(updatedRating);
    fetchCall(updatedRatingURL, "PATCH", body);
  };

  deleteRating = (deletedRating) => {
    const { presents } = this.state;

    const modifiedPresent = findPresent(presents, deletedRating);
    const notModifiedPresents = filterPresents(presents, deletedRating);

    const notModifiedRatings = filterRatings(modifiedPresent, deletedRating);
    modifiedPresent.ratings = [...notModifiedRatings]

    this.setState({ presents: [...notModifiedPresents, modifiedPresent] });

    const deletedRatingURL = `${ratingsURL}/${deletedRating.id}`;
    fetchCall(deletedRatingURL, "DELETE");
  }

  createPresents = () => {
    const { presents } = this.state;
    return presents.sort(AtoZ).map(present => {
      return (
        <Present 
          key={ present.id }
          present={ present }
          createRating={ this.createRating }
          updateRating={ this.updateRating }
          deleteRating={ this.deleteRating }
        />
      );
    });
  };
  
  render() {
    
    return (
      <div className="App">
        <h1>Present Truths</h1>
        { this.createPresents() }
      </div>
    );
  }
}

function findPresent(presents, rating) {
  return presents.find(present => {
    return present.id === rating.present_id;
  });
}

function filterPresents(presents, rating) {
  return presents.filter(present => {
    return present.id !== rating.present_id;
  });
}

function filterRatings(present, rating) {
  return present.ratings.filter(previousRating => {
    return previousRating.id !== rating.id;
  });
}

function AtoZ(a, b) {
  if (a.name > b.name) { return 1; }
  else if (a.name < b.name) { return -1; }
  else { return 0; }
}

function extractData(fastJson) {
  return fastJson.data.map(unNest);
}

function unNest(instance) {
  return instance.attributes;
}

function parseJSON(response) {
  return response.json();
}

function fetchCall(url, method, body) {
  const headers = { "Content-Type": "application/json"};
  return fetch( url, { method, headers, body } );
}

export default App;
