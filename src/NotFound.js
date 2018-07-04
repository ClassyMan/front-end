import React, { Component } from 'react';

/*
 * This is the page people will see when their url for
 * the app doesn't match anything which leads to an
 * actual component or discussion etc. 
 */
export default class NotFound extends Component {
  render() {
    return <p>404, we got drunk and lost that page *BUUURP* sorry</p>
  }
}
