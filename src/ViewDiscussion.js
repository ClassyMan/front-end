import React, { Component } from 'react';
import { Panel, Button} from 'react-bootstrap';
import {headerSettings} from './HttpSettings.js';
import Comment from './Comment.js';
import { Link } from 'react-router';
import CommentForm from './CommentForm.js';
import autobind from 'autobind-decorator';

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
        childeren:[]
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
    console.log('In discussion: ' + this.props.discussionId);
    console.log('Parent id: ' + this.props.parentId);

    let updatedParents = this.state.comment.parentIds;
    if (this.state.comment.id) {
      updatedParents.push(this.state.comment.id);
    }

    fetch('http://localhost:8080/comments/add', {
      method: 'POST',
      headers: headerSettings,
      body: JSON.stringify({
        discussionId: this.props.params.id,
        username: this.state.comment.username,
        content: this.state.content,
        parentIds: updatedParents,
        childeren: []
      })
    }).then((res) => {
      this.setState({addingNewComment: false});
    });
  }

  componentDidMount() {
    this.setState({username: localStorage.getItem('username')});
    this.loadPagedComments()
  }

  loadPagedComments() {
    console.log('Loading comments for discussion: ' + this.props.params.id);
    fetch('http://localhost:8080/comments/fetchCommentsForDiscussion', {
        method: 'POST',
        headers: headerSettings,
        body: JSON.stringify({
          discussionId: this.props.params.id
        })
      }
    )
    .then((res) => {
       console.log('response received');
       var text = res.text();
       console.log('result: ' + text);
       return text;
    })
    .then((text) => {
       console.log('parsing json: ' + text);
       var retreived = text.length ? JSON.parse(text) : {};
       this.setState({comments: retreived})
    });

    fetch('http://localhost:8080/discussions/fetchDiscussionById', {
        method: 'POST',
        headers: headerSettings,
        body: JSON.stringify({
          discussionId: this.props.params.id
        })
      }
    )
    .then((res) => {
       console.log('response received');
       var text = res.text();
       console.log('result: ' + text);
       return text;
    })
    .then((text) => {
       console.log('parsing json: ' + text);
       var retreived = text.length ? JSON.parse(text) : {};
       this.setState({title: retreived.title,
                      summary: retreived.summary})
    });
  }
}
