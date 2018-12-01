import React, { Component } from 'react';
import logo from '../logo.svg';
import Card from './Card'
import LeaderBoard from './LeaderBoard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        {/* <Card black text={"test. this is a much longer card and we will see how it looks"}/>
        <Card text={"test. this is a much longer card and we will see how it looks"}/> */}
        <LeaderBoard players={["person", "one", "two"]}/>
        </header>
      </div>
    );
  }
}

export default App;
