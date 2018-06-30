import React, { Component } from 'react';
import { Panel, Label, Button, FormGroup, FormControl } from 'react-bootstrap';
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
      content: '',
      addingNewComment: false,
      touched: {
        content: false
      }
    };
      // Can't really bind these where we use em so bind em in here
    this.validate = this.validate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  /*
   * Has this field been touched?
   */
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  /*
   * Add some validation for the content
   */
  validate(state) {
    // True here means invalid.
    return {
      content: state.content.length === 0
    };
  }

  render() {
    if (!this.state.addingNewComment) {
      return <div>
               <Button><Link to="/">Home</Link></Button>
               <Panel >
                 <Panel.Heading>
                   <Panel.Title>{this.state.title} : {this.props.params.id}</Panel.Title>
                 </Panel.Heading>
                   <Panel.Body>{this.state.summary}</Panel.Body>
               </Panel>
               <Button onClick={this.handleAddNewComment.bind(this)}>Reply</Button>
               {
                 this.state.comments
                 .sort((a, b) => a.createdTime < b.createdTime)
                 .map(comment => {
                                  return <Comment key={comment.id} username={comment.username} content={comment.content} />
                 })
               }
             </div>
    } else {

      const errors = this.validate(this.state);
      const isEnabled = !Object.keys(errors).some(x => errors[x]);

      const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field];
        return hasError ? shouldShow : false;
      };

      return <div>
               <p>you are viewing the {this.props.params.id} discussion</p>
               <form>
                 <CommentForm username={this.state.username} id={this.props.params.id}/>
               </form>
               {
                 this.state.comments
                 .sort((a, b) => a.createdTime < b.createdTime)
                 .map(comment => {
                   return <Comment key={comment.id} username={comment.username} content={comment.content} />
                 })
               }
             </div>
    }
  }

  handleAddNewComment() {this.setState({addingNewComment: true})}
  handleContentChange(event) {this.setState({content: event.target.value})}

  handleSubmit(event) {
    console.log('A comment was submitted by: ' + this.state.username);
    console.log('In discussion: ' + this.props.params.id);

    fetch('http://localhost:8080/comments/add', {
      method: 'POST',
      headers: headerSettings,
      body: JSON.stringify({
        discussionId: this.props.params.id,
        username: this.state.username,
        content: this.state.content
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
