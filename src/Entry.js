import React, { Component } from 'react';

class Entry extends Component {

  constructor(props) {
      super(props);

      this.state = {
          users: [],
          username: '',
          password: ''
      }
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
                  Password:
                 <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
              </label>
              <br/>
              <input type="submit" value="Submit" />
             </form>
             <p>Users:</p>
             {this.state.users.map(userInstance =>
                                {
                                  return <div key={userInstance.id}>
                                           <dt>{userInstance.username}</dt>
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

  handlePasswordChange(event) {
    console.log('Handling password change: ' + event.target.value);
    this.setState({password: event.target.value});
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
        password: this.state.password
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
