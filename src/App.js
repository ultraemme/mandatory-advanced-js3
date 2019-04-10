import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Todos from './components/Todos';
import { token$, removeToken } from './Store';
import jwt from 'jsonwebtoken';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {email: null}
  }

  componentDidMount () {
    this.subscription = token$.subscribe(value => {
      const decoded = jwt.decode(value);
      if(decoded) {
        this.setState({email: decoded.email})
      }
    })
  }

  componentWillUnmount () {
    this.subscription.unsubscribe();
  }

  handleLogout() {
    removeToken();
    this.setState({email: null});
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
          { this.state.email ?
            <>
              <span className="header__username">Logged in as: <strong>{this.state.email}</strong></span>
              <div className="header__nav">
                <i onClick={this.handleLogout.bind(this)}><Link className="header__link" to="/">SIGN OUT</Link></i>
              </div>
            </>
            :
            <>
              <span className="header__username"></span>
              <div className="header__nav">
                <i><Link className="header__link" to="/register">REGISTER</Link></i>
                <i><Link className="header__link" to="/">SIGN IN</Link></i>
              </div>
            </>
          }
          </header>
          <main>
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/todos" component={Todos}/>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
