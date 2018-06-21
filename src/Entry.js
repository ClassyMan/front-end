import React, { Component } from 'react';

class Entry extends Component {

  constructor(props) {
      super(props);

      this.state = {
          users: [],
          username: '',
          info: ''
      }
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleInfoChange = this.handleInfoChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  render() {
    return <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                  Username:
                 <input type="text" value={this.state.username} onChange={this.handleNameChange} />
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
             {this.state.users.map(userInstance =>
                                {
                                  return <div key={userInstance.id}>
                                           <dt>{userInstance.username}</dt>
                                           <dd>{userInstance.info}</dd>
                                           <button value={userInstance.id} onClick={this.handleDeleteUser}>Delete</button>
                                           <hr></hr>
                                         </div>})
                                }
           </div>
  }

  handleDeleteUser(userId) {
    console.log('attempting to delete user with id: ' + userId.target.value);
    fetch('http://localhost:8080/deletion/', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: userId.target.value
    }).then((res) => {
      this.loadAllUsers();
    });
  }

  handleNameChange(event) {
    console.log('Handling username change: ' + event.target.value);
    this.setState({username: event.target.value});
  }

  handleInfoChange(event) {
    console.log('Handling info change: ' + event.target.value);
    this.setState({info: event.target.value});
  }

  handleSubmit(event) {
    console.log('A username was submitted: ' + this.state.username);

    fetch('http://localhost:8080/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        info: this.state.info
      })
    });
  }

  componentDidMount() {
    this.loadAllUsers()
  }

  loadAllUsers() {
    console.log('attempting to call back end');
    return fetch('http://localhost:8080/listAll', {
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
       this.setState({users: retreived})
    });
  }
}

export default Entry;
