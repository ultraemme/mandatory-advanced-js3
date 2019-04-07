import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  componentDidMount () {
    const API_ROOT = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    const options = {
      headers: {
        Authorization: `Bearer "token from store"`
      }
    }
    axios.get(API_ROOT + '/todos', options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentWillUnmount () {
    this.source.cancel('Request canceled.');
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Todos</title>
        </Helmet>
        <>

        </>
      </>
    );
  }
}

export default Todos;