import React, { Component } from 'react';

export default class Discussions extends Component {

  constructor(props) {
        super(props);
    this.state = {
      discussions: [],
      title: '',
      summary: '',
      addingNewDiscussion: false
    }

    this.handleAddNewDiscussion = this.handleAddNewDiscussion.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if (this.state.addingNewDiscussion) {
      return <div>
               <form onSubmit={this.handleSubmit}>
                 <label>
                   Title:
                   <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                 </label>
                 <br/>
                 <label>
                   Summary:
                   <input type="text" value={this.state.summary} onChange={this.handleSummaryChange} />
                 </label>
                 <br/>
               <input type="submit" value="Submit" />
             </form>
             </div>
    } else {
      return <div>
               <button onClick={this.handleAddNewDiscussion}>Add new discussion</button>
               <p>Discussions</p>
               {
                 this.state.discussions
                 .sort((a, b) => a.createdTime < b.createdTime)
                 .map(discussion => {
                                  return <div key={discussion.id}>
                                           <h1>{discussion.title}</h1>
                                           <p>{discussion.summary}</p>
                                           <button value={discussion.id}>Open</button>
                                           <hr></hr>
                                         </div>
                 })
               }
             </div>
    }
  }

  handleAddNewDiscussion() {
    this.setState({addingNewDiscussion: true});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSummaryChange(event) {
    console.log('handling state change: ' + event.target.value);
    this.setState({summary: event.target.value})
  }

  handleSubmit(event) {
    console.log('A discussion was submitted: ' + this.state.title);

    fetch('http://localhost:8080/discussions/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
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
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', // explicitly set the content-type
          // spring is funny about this for some reason
        }
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
