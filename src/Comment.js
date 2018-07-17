import React, { Component } from 'react';
import { Button, Panel, Image } from 'react-bootstrap';
import CommentForm from './CommentForm.js';
import PropTypes from 'prop-types';
import { createComment, updateComment, deleteComment, vote } from './CommentSaver.js';

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
      editingComment: false,
      isDeleted: false,
      content: '',
      votes: this.props.comment.votes
    };
    this.handleCommentChange=this.handleCommentChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleEditComment=this.handleEditComment.bind(this);
    this.handleDeleteComment=this.handleDeleteComment.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
    this.upvote=this.upvote.bind(this);
    this.downvote=this.downvote.bind(this);
  }

  render() {
    let footer;
    if (this.state.addingNewComment === true) {
      footer = <CommentForm comment={this.props.comment} handleCommentChange={this.handleCommentChange} handleSubmit={this.handleSubmit} discussionId={this.props.discussionId}/>;
    } else if (localStorage.getItem('username') === this.props.comment.username) {
      footer = <div>
                 <Button onClick={this.handleAddNewComment.bind(this)}>Reply</Button>
                 <Button onClick={this.handleEditComment.bind(this)}>Edit</Button>
                 <Button onClick={this.handleDeleteComment.bind(this)}>Delete</Button>
               </div>;
    } else {
      footer = <div>
                 <Button onClick={this.handleAddNewComment.bind(this)}>Reply</Button>
               </div>;
    }

    let commentList = <ul>{
      this.state.comments
          .sort((a, b) => a.createdTime < b.createdTime)
          .map(comment => {
            return <li key={comment.id}><Comment key={comment.id} handleDelete={this.handleDelete} comment={comment} discussionId={this.props.discussionId}/></li>
          })
    }</ul>;

    let actualComment;
    if (this.state.editingComment) {
      actualComment = <CommentForm comment={this.props.comment} editExisting={true} handleCommentChange={this.handleCommentChange} handleSubmit={this.handleSubmit} discussionId={this.props.discussionId}/>;
    } else if (this.state.isDeleted) {
      actualComment = <div>
                        <Panel>
                          <Panel.Heading>[DELETED]</Panel.Heading>
                          <Panel.Body>[DELETED]</Panel.Body>
                          {footer}
                          {commentList}
                        </Panel>
                      </div>;
    } else {
      actualComment = <div>
                        <Panel>
                          <Panel.Heading>
                            <div>
                              {this.state.votes}
                              <Button><Image src={require('./images/material-design-icons-master/navigation/1x_web/ic_arrow_upward_black_18dp.png')} onClick={this.upvote} alt="arrow" /></Button>
                              <Button><Image src={require('./images/material-design-icons-master/navigation/1x_web/ic_arrow_downward_black_18dp.png')} onClick={this.downvote} alt="arrow" /></Button>
                              {this.props.comment.username}
                            </div>
                          </Panel.Heading>
                          <Panel.Body>{this.props.comment.content}</Panel.Body>
                          {footer}
                          {commentList}
                        </Panel>
                      </div>;
    }

    return actualComment;
  }

  upvote(event) {
    console.log('upvote');
    vote(this, this.state, this.props.comment,  1);
  }

  downvote(event) {
    console.log('downvote');
    vote(this, this.state, this.props.comment, -1);
  }

  handleCommentChange(event) {this.setState({content: event.target.value})}

  handleSubmit(event) {
    console.log('A comment was submitted by: ' + localStorage.getItem('username'));
    console.log('In discussion: ' + this.props.discussionId);
    if (this.state.editingComment) {
      updateComment(this, this.state, this.props.comment, this.props.discussionId);
    } else {
      createComment(this, this.state, this.props.comment, this.props.discussionId);
    }
  }

  handleEditComment(event) {this.setState({editingComment: true});}
  handleAddNewComment(event) {this.setState({addingNewComment: true});}

  handleDeleteComment(event){
    deleteComment(this, this.state, this.props.comment, this.props.discussionId);
    this.props.handleDelete(this.props.comment);
  }

  handleDelete(comment) {
    console.log('delete comment');
    if (comment.childeren.length > 0) {
      console.log('fake delete comment');
    } else {
      console.log('real delete comment');
      this.setState({comments: this.state.comments.filter(function(each) {
          return each !== comment
      })});
    }
  }
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
