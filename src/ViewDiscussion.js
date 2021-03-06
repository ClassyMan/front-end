import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import Comment from './Comment.js';
import { Link } from 'react-router';
import CommentForm from './CommentForm.js';
import { createComment } from './CommentSaver.js';
import { loadCommentsForDiscussionUsingUser, loadDiscussion } from './CommentLoader.js';

/*
 * Component for viewing and discussing a single discussion
 */
export default class ViewDiscussion extends Component {

  /*
   * Set up state to handle comment adding and loading
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      summary: '',
      comments: [],
      content: '',
      comment: {
        username: '',
        content: '',
        parentIds: [],
        childeren: []
      },
      addingNewComment: false
    };

    this.handleClickReply=this.handleClickReply.bind(this);
    this.handleCommentChange=this.handleCommentChange.bind(this);
    this.handleSaveNewComment=this.handleSaveNewComment.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }

  render() {
    let commentList = <div>{
      this.state.comments
      .sort((a, b) => a.createdTime < b.createdTime)
      .map(comment => {
        return <Comment key={comment.id} handleDelete={this.handleDelete} comment={comment} discussionId={this.props.params.id}/>
      })
    }</div>;

    let discussionHeader = <Panel>
                             <Panel.Heading>
                               <Panel.Title>{this.state.title} : {this.props.params.id}</Panel.Title>
                             </Panel.Heading>
                             <Panel.Body>{this.state.summary}</Panel.Body>
                           </Panel>;

    if (!this.state.addingNewComment) {
      return <div>
               <Button><Link to="/">Home</Link></Button>
               {discussionHeader}
               <Button onClick={this.handleClickReply}>Reply</Button>
               {commentList}
             </div>
    } else {
      return <div>
               <Button><Link to="/">Home</Link></Button>
               {discussionHeader}
               <CommentForm handleCommentChange={this.handleCommentChange} handleSubmit={this.handleSaveNewComment}/>;
               {commentList}
             </div>
    }
  }

  handleCommentChange(event) {this.setState({content: event.target.value})}

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

  handleClickReply(event) {this.setState({addingNewComment: true})}

  handleSaveNewComment(event) {
    console.log('A comment was submitted by: ' + localStorage.getItem('username'));
    createComment(this, this.state, this.state.comment, this.props.params.id);
  }

  componentDidMount() {
    this.setState({username: localStorage.getItem('username')});
    loadCommentsForDiscussionUsingUser(this, this.props.params.id, localStorage.getItem('username'));
    loadDiscussion(this, this.props.params.id);
  }
}
