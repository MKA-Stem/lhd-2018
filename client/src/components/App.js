import React, { Component } from 'react';
import logo from '../logo.svg';
import Card from './Card'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Card text={"test"}/>
        </header>
      </div>
    );
  }
}

export default App;
