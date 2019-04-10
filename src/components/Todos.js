import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { token$ } from '../Store';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {newTodo: '', todos: []};
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
    this.inputTodo = React.createRef();
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
    this.inputTodo.current.value = "";
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
        this.setState({todos, err: null});
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.error('Canceled the request to add a task.');
        } else if(err.response) {
          if (err.response.data.details) {
            this.setState({err: err.response.data.details[0].message})
          } else if (err.response.data.message) {
            this.setState({err: err.response.data.message});
          } else {
            this.setState({err: "something went wrong, please try again"});
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
          <form className="form form--todo" action="" onSubmit={this.postTodo.bind(this)}>
            <label className="form__text" htmlFor="">CONTENT:</label><br/>
            <input ref={this.inputTodo} className="form__input" onChange={this.handleChange.bind(this)} id="newTodo" type="text"/><br/><br/>
            <button className="form__submit" type="submit">ADD TASK</button>
          </form>
          {this.state.err ? <span className="errmsg">{this.state.err}!</span> : null}
          <br/>
          <br/><br/>
          <ul>
            {this.state.todos.map(todo => {
              return (
              <li className="todo__item" id={todo.id} key={todo.id}><span className="todo__text">{todo.content}</span>
                <i className="todo__remove" onClick={this.deleteTodo.bind(this)}>&times;</i>
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