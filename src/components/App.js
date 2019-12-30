import React, { Component } from 'react';
import './../stylesheets/App.scss';

const presentsURL = "http://localhost:3000/presents/"

class App extends Component {

  state = { presents: [] }

  componentDidMount() {
    fetch(presentsURL)
      .then(parseJSON)
      .then(presents => this.setState({ presents: extractData(presents) }));
  }
  
  render() {
    
    return (
      <div className="App">
        <h1>Present Truths</h1>
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
