import React, { Component } from 'react';
import { Panel, Button} from 'react-bootstrap';
import {headerSettings} from './HttpSettings.js';
import Comment from './Comment.js';
import { Link } from 'react-router';
import CommentForm from './CommentForm.js';
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
      username: '',
      addingNewComment: false
    };
  }

  render() {

    let commentList = <div>{
      this.state.comments
      .sort((a, b) => a.createdTime < b.createdTime)
      .map(comment => {
        return <Comment key={comment.id} comment={comment} id={this.props.params.id}/>
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
               <Button onClick={this.handleAddNewComment.bind(this)}>Reply</Button>
               {commentList}
             </div>
    } else {

      return <div>
               <p>you are viewing the {this.props.params.id} discussion</p>
               <form>
                 <CommentForm username={this.state.username} id={this.props.params.id}/>
               </form>
               {commentList}
             </div>
    }
  }

  handleAddNewComment() {this.setState({addingNewComment: true})}

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
