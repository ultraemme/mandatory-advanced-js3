import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form className="form form--login-register" action="" onSubmit={this.props.handleSubmit}>
        <label className="form__text" htmlFor="">EMAIL</label><br/>
        <input className="form__input" onChange={this.props.handleChange} id="email" type="text"/><br/><br/>
        <label htmlFor="">PASSWORD</label><br/>
        <input className="form__input" onChange={this.props.handleChange} id="password" type="password"/><br/><br/>
        <button className="form__submit" type="submit">{this.props.formType}</button>
      </form>
    );
  }
}

export default Form;