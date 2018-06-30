import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

/*
 * Component for viewing and discussing a single discussion
 */
export default class Comment extends Component {

  render() {
    return <div>
             <Panel>
               <Panel.Heading>{this.props.username}</Panel.Heading>
               <Panel.Body>{this.props.content}</Panel.Body>
             </Panel>
           </div>
  }
}