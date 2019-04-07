import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>

          </header>
          <nav>
            <ul>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/">Login</Link></li>
            </ul>
          </nav>
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register}/>
        </div>
      </Router>
    );
  }
}

export default App;
