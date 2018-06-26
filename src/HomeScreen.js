import React, { Component } from 'react';
import Discussions from './Discussions.js';
import Menu from 'Menu.js';

class HomeScreen extends Component {

  constructor(props) {
      super(props); // call super

      this.state = {
        username: '',
        password: '',
        loggedIn: '',
        registered: ''
      }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
      this.handleRegistrationAttempt = this.handleRegistrationAttempt.bind(this);
  }

  render() {
    if (localStorage.getItem('loggedIn')) {
      return <div>
               <Menu />
               <Discussions />
             </div>
    } else {
      return <div>
               <input type="text" value={this.state.username} onChange={this.handleNameChange} />
               <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
               <button onClick={this.handleLoginAttempt}>Login</button>
               <button onClick={this.handleRegistrationAttempt}>Register</button>
             </div>
    }

  }


  handleLoginAttempt(event) {
    console.log('Login attempt: ' + this.state.username);

    fetch('http://localhost:8080/auth/loginAttempt', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then((res) => {
      console.log('response received');
      var text = res.text();
      console.log('result: ' + text);
      return text;
   })
   .then((text) => {
      console.log('Login status?: ' + text);
      var retreived = text.length ? JSON.parse(text) : {};
      localStorage.setItem('loggedIn', retreived);
      this.setState({loggedIn: retreived})
   });
  }

  handleRegistrationAttempt(event) {
    console.log('Registration has been attempted: ' + this.state.username);

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
    }).then((res) => {
      console.log('response received');
      var text = res.status;
      console.log('Registration attempt: ' + text==='200');
      this.setState({registered: text==='200'})
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
}

export default HomeScreen;
