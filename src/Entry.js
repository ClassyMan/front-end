import React, { Component } from 'react';

class Entry extends Component {

  constructor(props) {
      super(props);

      this.state = {
          user: {}
      }
  }

  render() {
    if (!this.state.user.firstName) {
      return <p>Loading...</p>
    }
    return <div>
             <p>Name of user: {this.state.user.firstName}</p>
           </div>
  }

  componentDidMount() {
    this.getUserByFirstName('Olga')
  }

  getUserByFirstName(name) {
    console.log('attempting to call back end');
    return fetch('http://localhost:8080/fetchUser?name=Olga')
      .then((res) => {
         console.log('response received');
         var text = res.text();
         console.log('result: ' + text);
         return text;
      })
    	.then((text) => {
         console.log('parsing json: ' + text);
         var retreived = text.length ? JSON.parse(text) : {};
         this.setState({user: retreived})
      });
  }
}

export default Entry;
