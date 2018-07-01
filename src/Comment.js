import React, { Component } from 'react';
import { Label, Button, Panel } from 'react-bootstrap';
import CommentForm from './CommentForm.js';
import PropTypes from 'prop-types';


/*
 * Component for viewing and discussing a single discussion
 */
class Comment extends Component {

  /*
   * Set up state to handle comment adding and loading
   */
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      addingNewComment: false
    };
  }

  render() {
    let footer;
    if (this.state.addingNewComment == true) {
      footer = <CommentForm username={this.props.comment.username} id={this.props.id}/>;
    } else {
      footer = <Button onClick={this.handleAddNewComment.bind(this)}>Reply</Button>;
    }
    return <div>
             <Panel>
               <Panel.Heading>{this.props.comment.username}</Panel.Heading>
               <Panel.Body>{this.props.comment.content}</Panel.Body>
               {footer}
             </Panel>
           </div>
  }

  handleAddNewComment(event) {
    console.log('newCommentFlag: ' + this.state.addingNewComment);
    this.setState({addingNewComment: true});
    console.log('newCommentFlag: ' + this.state.addingNewComment);
  }
}

Comment.propTypes = {
  comment: PropTypes.shape(
    {username: PropTypes.string,
     content: PropTypes.string}
  ).isRequired,
  id: PropTypes.string.isRequired
}

export default Comment;
