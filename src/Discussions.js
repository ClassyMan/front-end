import React, { Component } from 'react';

export default class Discussions extends Component {

  constructor(props) {
        super(props);
    this.state = {
      discussions: []
    }
  }

  render() {
    return <div>
             <button>Add new discussion</button>
             <p>Discussions</p>
             {
               this.state.discussions.map(discussion => {
                                return <div key={discussion.id}>
                                         <dt>{discussion.title}</dt>
                                         <button value={discussion.id}>Open</button>
                                         <hr></hr>
                                       </div>
               })
             }
           </div>
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
