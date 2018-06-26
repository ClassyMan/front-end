import React, { Component } from 'react';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  render() {
    return <button onClick={this.handleLogout}>Log out</button>
  }

  handleLogout() {
    console.log('Log out attempted')
  }
}
