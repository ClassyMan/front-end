import React, { Component } from 'react';

export default class ViewDiscussion extends Component {
  render() {
    return <p>you are viewing the {this.props.params.id} discussion</p>
  }
}
