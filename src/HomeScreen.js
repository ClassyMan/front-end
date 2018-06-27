import React, { Component } from 'react';
import Discussions from './Discussions.js';
import Menu from './Menu.js';

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
      this.handleLogoutAttempt = this.handleLogoutAttempt.bind(this);
      this.handleRegistrationAttempt = this.handleRegistrationAttempt.bind(this);
      this.stateIsValid = this.stateIsValid.bind(this);
  }

  /*
   * Render the login if the yser is not logged in
   * Otherwise display the list of open discussions.
   */
  render() {
    console.log('logged in status' + localStorage.getItem('loggedIn'));
    if (localStorage.getItem('loggedIn') === 'true') {
      return <div>
               <Menu logoutMethod={this.handleLogoutAttempt}/>
               <Discussions />
             </div>
    } else {
      return <div>
               <input type="text" value={this.state.username} onChange={this.handleNameChange} />
               <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
               <button disabled={!this.stateIsValid()} onClick={this.handleLoginAttempt}>Login</button>
               <button disabled={!this.stateIsValid()} onClick={this.handleRegistrationAttempt}>Register</button>
             </div>
    }

  }
 
  stateIsValid() {
    if (this.state.username.length > 0 && this.state.password.length > 8) {
      return true;
    }
  }

  /*
   * When a user attempts to log in, send an http request to verify that they
   * are indeed a user and then cache the fact that they are logged in
   */
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
      this.setState({loggedIn: retreived});
      console.log('login status set to ' + retreived);
   });
  }

  /*
   * When a user logs out set both the state and the cached value to false for
   * whether or not the user is logged in.
   */
  handleLogoutAttempt(event) {
    console.log('logging out');
    this.setState({loggedIn: false});
    console.log('login status set to ' + this.state.loggedIn);
    localStorage.setItem('loggedIn', 'false');
    console.log('localStorage login status set to ' + localStorage.getItem('loggedIn'));
  }

  /*
   * When a user attempts to register themselves we need to record them as a new
   * user and send an http request to the back end so that they can be added to
   * the users collection.
   */
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

  /*
   * In the event of a name change, make sure that state is updated
   */
  handleNameChange(event) {
    console.log('Handling username change: ' + event.target.value);
    this.setState({username: event.target.value});
  }

  /*
   * In the event of a password change, make sure that state is updated
   * Do not log out the password as this will still be in plain text form.
   */
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
}

export default HomeScreen;
