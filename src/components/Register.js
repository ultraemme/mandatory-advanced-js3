import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';

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
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    const options = {cancelToken: this.source.token}
    axios.post(API_ROOT + '/register', data, options)
      .then(res => {
        this.setState({registered: true});
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.error('Canceled the request to register.');
        } else if (err.response) {
          if (err.response.data.details) {
            this.setState({err: err.response.data.details[0].message})
          } else if (err.response.data.message) {
            this.setState({err: err.response.data.message});
          } else {
            this.setState({err: "something went wrong, please try again"});
          }
        } else {
          console.log(err.response);
        }
      })
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  componentWillUnmount () {
    this.source.cancel('Request canceled.');
  }

  render() {
    if (this.state.registered) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { regmsg: "you successfully registered, please log in!" }
        }}
        />
      )
    } else {
      return (
        <>
          <Helmet>
            <title>Register</title>
          </Helmet>
          <>
            <Form formType={"REGISTER"} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleRegister.bind(this)}/>
            {this.state.err ? <span className="errmsg">{this.state.err}!</span> : null}
          </>
        </>
      );
    }
  }
}

export default Register;
