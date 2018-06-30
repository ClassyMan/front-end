import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { PageHeader } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './HomeScreen.js';
import NotFound from './NotFound.js';
import ViewDiscussion from './ViewDiscussion.js';

/*
 * From here all things are possible
 */
export default class App extends Component {
  render() {
    return (
      <div>
        <PageHeader className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Intrinsic</h1>
        </PageHeader>
        <Router history={hashHistory}>
          <Route path='/' component={HomeScreen} />
          <Route path='/viewdiscussion/:id' component={ViewDiscussion} />
          <Route path='*' component={NotFound} />
        </Router>
      </div>
    ); 
  }
};
