import React, { Component } from 'react';
import './app.css';
import Contacts from "./contacts/contacts";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Contacts/>
      </div>
    );
  }
}

export default App;
