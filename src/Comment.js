import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
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
    if (this.state.addingNewComment === true) {
      footer = <CommentForm comment={this.props.comment} parentId={this.props.comment.id} discussionId={this.props.id}/>;
    } else {
      footer = <Button onClick={this.handleAddNewComment.bind(this)}>Reply</Button>;
    }


    let commentList = <ul>{
      this.props.comment.childeren
          .sort((a, b) => a.createdTime < b.createdTime)
          .map(comment => {
            return <li key={comment.id}><Comment key={comment.id} comment={comment} parentId={this.props.comment.id} discussionId={this.props.id}/></li>
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

  handleAddNewComment(event) {
    console.log('newCommentFlag: ' + this.state.addingNewComment);
    this.setState({addingNewComment: true});
    console.log('newCommentFlag: ' + this.state.addingNewComment);
  }
}

Comment.propTypes = {
  comment: PropTypes.shape(
    {username: PropTypes.string.isRequired,
     content: PropTypes.string.isRequired,
     parentIds: PropTypes.array.isRequired,
     childeren: PropTypes.array.isRequired}
  ).isRequired,
  id: PropTypes.string.isRequired
}

export default Comment;
