import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  handleLogin(e) {
    e.preventDefault();
    const API_ROOT = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    axios.post(API_ROOT + '/auth', {email: 'example@example.com', password: 'example'}, {cancelToken: this.source.token})
      .then(res => {
        console.log(res);
        const decoded = jwt.decode(res.data.token);
        console.log(decoded);
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.error('Canceled the request to login.');
        } else if (err.response) {
          console.log(err.response.data)
        } else {
          console.log(err)
        }
      })
  }

  componentWillUnmount () {
    this.source.cancel('Request canceled.');
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <>
          <button onClick={this.handleLogin.bind(this)}>Login</button>
        </>
      </>
    );
  }
}

export default Login;
