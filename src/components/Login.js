import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { updateToken } from '../Store'
import Form from './Form';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "example@example.com", password: "example", loggedIn: false};
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  handleLogin(e) {
    e.preventDefault();
    console.log(this.state);
    const API_ROOT = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    const data = {
      email: this.state.username,
      password: this.state.password
    }
    const options = {cancelToken: this.source.token}
    axios.post(API_ROOT + '/auth', data, options)
      .then(res => {
        updateToken(res.data.token);
        this.setState({loggedIn: true})
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.error('Canceled the request to login.');
        } else if (err.response) {
          console.log(err.response);
          if (err.response.data.details) {
            this.setState({err: err.response.data.details[0].message})
          } else {
            this.setState({err: err.response.data.message});
          }
        } else {
          console.log(err)
        }
      })
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
    console.log(this.state);
  }

  componentWillUnmount () {
    this.source.cancel('Request canceled.');
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to="/todos"/>
      )
    } else {
      return (
        <>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <>
            <Form handleChange={this.handleChange.bind(this)} handleSubmit={this.handleLogin.bind(this)}/>
            {this.state.err ? <span>{this.state.err}</span> : null}
          </>
        </>
      );
    }
  }
}

export default Login;
