import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form action="" onSubmit={this.props.handleSubmit}>
        <label htmlFor="">Email:</label><br/>
        <input onChange={this.props.handleChange} id="email" type="text"/><br/><br/>
        <label htmlFor="">Password:</label><br/>
        <input onChange={this.props.handleChange} id="password" type="password"/><br/><br/>
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default Form;