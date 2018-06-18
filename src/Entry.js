import React, { Component } from 'react';

class Entry extends Component {

  constructor(props) {
      super(props);

      this.state = {
          user: [],
          name: '',
          info: ''
      }
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleInfoChange = this.handleInfoChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                  Name:
                 <input type="text" value={this.state.name} onChange={this.handleNameChange} />
              </label>
              <br/>
              <label>
                  Info:
                 <input type="text" value={this.state.info} onChange={this.handleInfoChange} />
              </label>
              <br/>
              <input type="submit" value="Submit" />
             </form>
             <p>Users:</p>
             {this.state.user.map(userInstance =>
                                {
                                  return <div key={userInstance.id}>
                                           <dt>{userInstance.firstName}</dt>
                                           <dd>{userInstance.info}</dd>
                                           <hr></hr>
                                         </div>})
                                }
           </div>
  }

  handleNameChange(event) {
    console.log('Handling name change: ' + event.target.value);
    this.setState({name: event.target.value});
  }

  handleInfoChange(event) {
    console.log('Handling info change: ' + event.target.value);
    this.setState({info: event.target.value});
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
        firstName: this.state.name,
        info: this.state.info
      })
    })
  }

  componentDidMount() {
    this.getUserByFirstName('Olga')
  }

  getUserByFirstName(name) {
    console.log('attempting to call back end');
    return fetch('http://localhost:8080/listAll')
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
