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
    // const errors = this.validate(this.state);
    // const isEnabled = !Object.keys(errors).some(x => errors[x]);
    //
    // const shouldMarkError = (field) => {
    //   const hasError = errors[field];
    //   const shouldShow = this.state.touched[field];
    //   return hasError ? shouldShow : false;
    // };
    // //className={shouldMarkError('content') ? "error" : ""}
    // //onBlur={this.handleBlur('content')}
    return <FormGroup>
             <label>Reply</label><br/>
             <Label type="text" value={this.props.username}/>
             <br/>
             <FormControl componentClass="textarea" onChange={this.props.handleCommentChange} placeholder="Reply to OP, be nice..."/>
             <br/>
             <Button type="submit" onClick={this.props.handleSubmit}>Submit</Button>
           </FormGroup>
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
