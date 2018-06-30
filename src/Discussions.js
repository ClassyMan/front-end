import React, { Component } from 'react';
import {headerSettings} from './HttpSettings.js';
import { Panel, Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router';

/*
 * Display a list of current discussions to the user:
 * - Ordered by youngest first
 * - Allow a user to add a discussion
 */
export default class Discussions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      title: '',
      summary: '',
      addingNewDiscussion: false,
      touched: {
        title: false
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
   * Add some validation for the username and password
   */
  validate(state) {
    // True here means invalid.
    return {
      username: state.title.length === 0
    };
  }

  render() {
    if (this.state.addingNewDiscussion) {
      const errors = this.validate(this.state);
      const isEnabled = !Object.keys(errors).some(x => errors[x]);

      const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field];
        return hasError ? shouldShow : false;
      };
      return <div>
               <form>
                 <FormGroup>
                   <label>Submit a new discussion</label><br/>
                   <FormControl type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} placeholder="Enter a title for this discussion..." className={shouldMarkError('title') ? "error" : ""} onBlur={this.handleBlur('title')} />
                   <br/>
                   <FormControl componentClass="textarea" value={this.state.summary} onChange={this.handleSummaryChange.bind(this)} placeholder="Summarize it in more detail..." />
                   <br/>
                   <Button disabled={!isEnabled} type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
                 </FormGroup>
               </form>
             </div>
    } else {
      return <div>
               <Button onClick={this.handleAddNewDiscussion.bind(this)}>Add new discussion</Button>
               <p>Discussions</p>
               {
                 this.state.discussions
                 .sort((a, b) => a.createdTime < b.createdTime)
                 .map(discussion => {
                   return <Panel key = {discussion.id}>
                            <Panel.Heading>
                              <Link to={"/viewdiscussion/" + discussion.id}>{discussion.title}</Link>
                            </Panel.Heading>
                            <Panel.Body>{discussion.summary}</Panel.Body>
                          </Panel>
                 })
               }
             </div>
    }
  }

  handleAddNewDiscussion() {this.setState({addingNewDiscussion: true})}

  handleTitleChange(event) {this.setState({title: event.target.value})}

  handleSummaryChange(event) {this.setState({summary: event.target.value})}

  handleSubmit(event) {
    console.log('A discussion was submitted: ' + this.state.title);

    fetch('http://localhost:8080/discussions/add', {
      method: 'POST',
      headers: headerSettings,
      body: JSON.stringify({
        title: this.state.title,
        summary: this.state.summary
      })
    });
  }

  componentDidMount() {
    this.loadPagedDiscussions()
  }

  loadPagedDiscussions() {
    console.log('attempting to load discussions');
    return fetch('http://localhost:8080/discussions/listAll', {
        headers: headerSettings
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
       this.setState({discussions: retreived})
    });
  }
}
