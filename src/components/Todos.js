import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { token$ } from '../Store';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {newTodo: "", todos: []};
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  componentDidMount () {
    const API_ROOT = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    const options = {
      cancelToken: this.source.token,
      headers: {
        Authorization: `Bearer ${token$.value}`
      }
    }
    axios.get(API_ROOT + '/todos', options)
      .then(res => {
        this.setState({todos: res.data.todos})
        console.log(this.state.todos);
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentWillUnmount () {
    this.source.cancel('Request canceled.');
  }

  postTodo(e) {
    e.preventDefault();
    const API_ROOT = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    const options = {
      headers: {
        Authorization: `Bearer ${token$.value}`
      }
    }
    axios.post(API_ROOT + "/todos", {content: this.state.newTodo}, options)
      .then(res => {
        const todos = this.state.todos;
        todos.push(res.data.todo);
        this.setState({todos});
        console.log(this.state.todos);
        console.log(res);
      })
      .catch(err => {

      })
  }

  deleteTodo(e) {
    e.preventDefault();
    const id = e.target.parentNode.id;
    const API_ROOT = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    const options = {
      headers: {
        Authorization: `Bearer ${token$.value}`
      }
    }
    axios.delete(API_ROOT + "/todos/" + id, options)
      .then(res => {
        const todos = this.state.todos.filter(todo => {
          console.log(todo);
          return todo.id !== id;
        })
        this.setState({todos})
        console.log(res)
      });

    console.log(e.nativeEvent);
    console.log(e.target.parentNode.id);
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    const todos = this.state.todos.map(todo => {
      console.log(todo);
      return (
        <li id={todo.id} key={todo.id}>{todo.content}
          <button onClick={this.deleteTodo.bind(this)}>Delete</button>
        </li>
      )
    })
    return (
      <>
        <Helmet>
          <title>Todos</title>
        </Helmet>
        <>
          <form action="" onSubmit={this.postTodo.bind(this)}>
            <label htmlFor="">Todo:</label><br/>
            <input onChange={this.handleChange.bind(this)} id="newTodo" type="text"/><br/><br/>
            <button type="submit">Add todo</button>
          </form>
          <br/><br/>
          <ul>
            {todos}
          </ul>
        </>
      </>
    );
  }
}

export default Todos;