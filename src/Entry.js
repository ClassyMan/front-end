import React, { Component } from 'react';

class Entry extends Component {

  constructor(props) {
      super(props);

      this.state = {
          user: {},
          name: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if (!this.state.user.firstName) {
      return <p>Loading...</p>
    }
    return <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                  Name:
                 <input type="text" value={this.state.name} onChange={this.handleChange} />
               </label>
             <input type="submit" value="Submit" />
             </form>
             <p>Name of user: {this.state.user.firstName}</p>
           </div>
  }

  handleChange(event) {
    console.log('Handling change');
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.name);
    event.preventDefault();
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.state.name
      })
    })
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
