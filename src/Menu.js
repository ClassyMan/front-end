import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  render() {
    return <Button onClick={this.handleLogout}>Log out</Button>
  }

  handleLogout() {
    console.log('Log out attempted')
    this.props.logoutMethod();
  }
}
