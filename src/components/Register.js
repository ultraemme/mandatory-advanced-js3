import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {registered: false};
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  handleRegister(e) {
    e.preventDefault();
    const API_ROOT = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    axios.post(API_ROOT + '/register', {email: 'example@example.com', password: 'example'}, {cancelToken: this.source.token})
      .then(res => {
        this.setState({registered: true});
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Canceled the request to register.');
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
    if (this.state.registered) {
      return (
        <Redirect to="/login"/>
      )
    } else {
      return (
        <>
          <Helmet>
            <title>Register</title>
          </Helmet>
          <>
            <button onClick={this.handleRegister.bind(this)}>Register</button>
          </>
        </>
      );
    }
  }
}

export default Register;
