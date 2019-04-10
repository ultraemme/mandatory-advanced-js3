import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
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
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.error('Canceled the request to fetch tasks.');
        }
      })
  }

  componentWillUnmount () {
    this.source.cancel('Request canceled.');
  }

  postTodo(e) {
    e.preventDefault();
    const API_ROOT = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    const data = {
      content: this.state.newTodo
    }
    const options = {
      cancelToken: this.source.token,
      headers: {
        Authorization: `Bearer ${token$.value}`
      }
    }
    axios.post(API_ROOT + "/todos", data, options)
      .then(res => {
        const todos = this.state.todos;
        todos.push(res.data.todo);
        this.setState({todos});
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.error('Canceled the request to add a task.');
        } else if(err.response) {
          if (err.response.data.details) {
            this.setState({err: err.response.data.details[0].message})
          } else {
            this.setState({err: err.response.data.message});
          }
        }
      })
  }

  deleteTodo(e) {
    e.preventDefault();
    const id = e.target.parentNode.id;
    const API_ROOT = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    const options = {
      cancelToken: this.source.token,
      headers: {
        Authorization: `Bearer ${token$.value}`
      }
    }
    axios.delete(API_ROOT + "/todos/" + id, options)
      .then(res => {
        const todos = this.state.todos.filter(todo => {
          return todo.id !== id;
        })
        this.setState({todos})
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.error('Canceled the request to delete a task.');
        }
      })
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Todos</title>
        </Helmet>
        <>
          <form action="" onSubmit={this.postTodo.bind(this)}>
            <label htmlFor="">Task content:</label><br/>
            <input onChange={this.handleChange.bind(this)} id="newTodo" type="text"/><br/><br/>
            <button type="submit">Add task</button>
          </form>
          <br/>
          {this.state.err ? <span>{this.state.err}</span> : null}
          <br/><br/>
          <ul>
            {this.state.todos.map(todo => {
              return (
              <li id={todo.id} key={todo.id}>{todo.content}
                <button onClick={this.deleteTodo.bind(this)}>Delete</button>
              </li>
              )
            })}
          </ul>
        </>
      </>
    );
  }
}

export default Todos;