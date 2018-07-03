import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import CommentForm from './CommentForm.js';
import PropTypes from 'prop-types';
import {headerSettings} from './HttpSettings.js';
import { createComment } from './CommentLoader.js';

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
      comments: this.props.comment.childeren,
      addingNewComment: false,
      content: ''
    };
    this.handleCommentChange=this.handleCommentChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  render() {
    let footer;
    if (this.state.addingNewComment === true) {
      footer = <CommentForm comment={this.props.comment} handleCommentChange={this.handleCommentChange} handleSubmit={this.handleSubmit} discussionId={this.props.discussionId}/>;
    } else {
      footer = <Button onClick={this.handleAddNewComment.bind(this)}>Reply</Button>;
    }

    let commentList = <ul>{
      this.state.comments
          .sort((a, b) => a.createdTime < b.createdTime)
          .map(comment => {
            return <li key={comment.id}><Comment key={comment.id} comment={comment} discussionId={this.props.discussionId}/></li>
          })
    }</ul>;

    return <div>
             <Panel>
               <Panel.Heading>{this.props.comment.username}</Panel.Heading>
               <Panel.Body>{this.props.comment.content}</Panel.Body>
               {footer}
               {commentList}
             </Panel>
           </div>
  }

  handleCommentChange(event) {this.setState({content: event.target.value})}

  handleSubmit(event) {
    console.log('A comment was submitted by: ' + localStorage.getItem('username'));
    console.log('In discussion: ' + this.props.discussionId);

    createComment(this, this.state, this.props.comment, this.props.discussionId);
  }

  handleAddNewComment(event) {this.setState({addingNewComment: true});}
}

Comment.propTypes = {
  comment: PropTypes.shape(
    {username: PropTypes.string.isRequired,
     content: PropTypes.string.isRequired,
     parentIds: PropTypes.array.isRequired,
     childeren: PropTypes.array.isRequired}
  ).isRequired,
  discussionId: PropTypes.string.isRequired
}

export default Comment;
