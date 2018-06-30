import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import CommentForm from './CommentForm.js';

/*
 * Component for viewing and discussing a single discussion
 */
export default class Comment extends Component {

  /*
   * Set up state to handle comment adding and loading
   */
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      addingNewComment: false
    };
    this.handleAddNewComment=this.handleAddNewComment.bind(this);
  }

  render() {
    let footer;

    if (this.state.addingNewComment) {
      footer = <CommentForm username={this.props.username} id={this.props.id}/>
    } else {
      footer = <Button onClick={this.handleAddNewComment.bind(this)}>Reply</Button>;
    }
    return <div>
             <Panel>
               <Panel.Heading>{this.props.username}</Panel.Heading>
               <Panel.Body>{this.props.content}</Panel.Body>
               <Button>Reply</Button>
             </Panel>
             <Button onClick={this.handleAddNewComment}>Reply</Button>
           </div>
  }

  handleAddNewComment() {
    console.log('newCommentFlag: ' + this.state.addingNewComment);
    this.setState({addingNewComment: true});
    console.log('newCommentFlag: ' + this.state.addingNewComment);
  }
}
