import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { headerSettings } from './HttpSettings.js';
import Comment from './Comment.js';
import { Link } from 'react-router';
import CommentForm from './CommentForm.js';
import autobind from 'autobind-decorator';
import { createComment } from './CommentSaver.js';
import { loadAllCommentsForDiscussion, loadDiscussion } from './CommentLoader.js';

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

    this.handleAddNewComment=this.handleAddNewComment.bind(this);
    this.handleCommentChange=this.handleCommentChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  render() {

    let commentList = <div>{
      this.state.comments
      .sort((a, b) => a.createdTime < b.createdTime)
      .map(comment => {
        return <Comment key={comment.id} comment={comment} discussionId={this.props.params.id}/>
      })
    }</div>;

    if (!this.state.addingNewComment) {
      return <div>
               <Button><Link to="/">Home</Link></Button>
               <Panel>
                 <Panel.Heading>
                   <Panel.Title>{this.state.title} : {this.props.params.id}</Panel.Title>
                 </Panel.Heading>
                   <Panel.Body>{this.state.summary}</Panel.Body>
               </Panel>
               <Button onClick={this.handleAddNewComment}>Reply</Button>
               {commentList}
             </div>
    } else {

      return <div>
               <p>you are viewing the {this.props.params.id} discussion</p>
               <form>
                 <CommentForm handleCommentChange={this.handleCommentChange} handleSubmit={this.handleSubmit}/>;
               </form>
               {commentList}
             </div>
    }
  }

  handleCommentChange(event) {this.setState({content: event.target.value})}

  handleAddNewComment(event) {this.setState({addingNewComment: true})}

  handleSubmit(event) {
    console.log('A comment was submitted by: ' + localStorage.getItem('username'));

    createComment(this, this.state, this.state.comment, this.props.params.id);
  }

  componentDidMount() {
    this.setState({username: localStorage.getItem('username')});
    loadAllCommentsForDiscussion(this, this.props.params.id);
    loadDiscussion(this, this.props.params.id);
  }
}
