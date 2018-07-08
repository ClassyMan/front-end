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
    let value;
    if (this.props.editExisting) {
      value = this.props.comment.content;
    } else {
      value = null;
    }
    return <FormGroup>
             <label>Reply</label><br/>
             <Label type="text" value={this.props.username}/>
             <br/>
             <FormControl value={value} componentClass="textarea" onChange={this.props.handleCommentChange} placeholder="Reply to OP, be nice..."/>
             <br/>
             <Button type="submit" onClick={this.props.handleSubmit}>Submit</Button>
           </FormGroup>
  }
}

export default CommentForm;
