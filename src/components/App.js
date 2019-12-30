import React, { Component } from 'react';
import './../stylesheets/App.scss';
import PresentCard from './PresentCard';

const presentsURL = "http://localhost:3000/presents/"

class App extends Component {

  state = { presents: [] }

  componentDidMount() {
    fetch(presentsURL)
      .then(parseJSON)
      .then(presents => this.setState({ presents: extractData(presents) }));
  }

  createPresentCards = () => {
    const { presents } = this.state;
    return presents.map(present => {
      return (
       <PresentCard key={ present.id } present={ present } />
      );
    })
  }
  
  render() {
    
    return (
      <div className="App">
        <h1>Present Truths</h1>
        { this.createPresentCards() }
      </div>
    );
  }
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

export default App;
