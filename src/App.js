import React, { Component } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Todos from './components/Todos';
import { token$ } from './Store';
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
    this.setState({email: null});
    //remove token
    //make sure you can't go to profile
  }

  render() {
    return (
      <Router>
        <div className={styles.App}>
          <header className={styles.header}>
          { this.state.email ?
            <>
              <span className={styles.header__username}>{this.state.email}</span>
              <div className={styles.header__nav}>
                <i onClick={this.handleLogout.bind(this)} className={styles.header__link}><Link to="/">Sign out</Link></i>
              </div>
            </>
            :
            <>
              <span className={styles.header__username}></span>
              <div className={styles.header__nav}>
                <i className={styles.header__link}><Link to="/register">Register</Link></i>
                <i className={styles.header__link}><Link to="/">Sign in</Link></i>
              </div>
            </>
          }
          </header>
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/todos" component={Todos}/>
        </div>
      </Router>
    );
  }
}

export default App;
