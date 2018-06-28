import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './HomeScreen.js';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Intrinsic</h1>
        </header>
        <br/>
        <HomeScreen />
      </div>
    );
  }
};
