import React, { Component } from 'react';
import { Label, Button, FormGroup, FormControl } from 'react-bootstrap';
import {headerSettings} from './HttpSettings.js';
import Comment from './Comment.js';

/*
 * Component for viewing and discussing a single discussion
 */
export default class CommentForm extends Component {

  /*
   * Set up state to handle comment adding and loading
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
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
    const errors = this.validate(this.state);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    return <FormGroup>
             <label>Reply</label><br/>
             <Label type="text" value={this.props.username}/>
             <br/>
             <FormControl componentClass="textarea" value={this.state.content} onChange={this.handleContentChange.bind(this)} placeholder="Reply to OP, be nice..." className={shouldMarkError('content') ? "error" : ""} onBlur={this.handleBlur('content')}/>
             <br/>
             <Button disabled={!isEnabled} type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
           </FormGroup>
  }

  handleContentChange(event) {this.setState({content: event.target.value})}

  handleSubmit(event) {
    console.log('A comment was submitted by: ' + this.props.username);
    console.log('In discussion: ' + this.props.id);

    fetch('http://localhost:8080/comments/add', {
      method: 'POST',
      headers: headerSettings,
      body: JSON.stringify({
        discussionId: this.props.id,
        username: this.props.username,
        content: this.state.content
      })
    }).then((res) => {
      this.setState({addingNewComment: false});
    });
  }
}
