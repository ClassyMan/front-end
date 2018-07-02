import React, { Component } from 'react';
import { Label, Button, FormGroup, FormControl } from 'react-bootstrap';
import {headerSettings} from './HttpSettings.js';
import Comment from './Comment.js';
import PropTypes from 'prop-types';

/*
 * Component for viewing and discussing a single discussion
 */
class CommentForm extends Component {

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
    console.log('A comment was submitted by: ' + this.props.comment.username);
    console.log('In discussion: ' + this.props.discussionId);
    console.log('Parent id: ' + this.props.parentId);

    let updatedParents = this.props.comment.parentIds;
    updatedParents.push(this.props.comment.id);

    fetch('http://localhost:8080/comments/add', {
      method: 'POST',
      headers: headerSettings,
      body: JSON.stringify({
        discussionId: this.props.discussionId,
        username: this.props.comment.username,
        content: this.state.content,
        parentId: this.props.comment.parentId,
        parentIds: updatedParents,
        childeren: []
      })
    }).then((res) => {
      this.setState({addingNewComment: false});
    });
  }
}

CommentForm.propTypes = {
  comment: PropTypes.shape(
    {username: PropTypes.string.isRequired,
     content: PropTypes.string.isRequired,
     parentIds: PropTypes.array.isRequired,
     childeren: PropTypes.array.isRequired}
  ).isRequired,
  discussionId: PropTypes.string.isRequired
}

export default CommentForm;
