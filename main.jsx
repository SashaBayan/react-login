//enable React Devtools on Chrome and Firefox
if (typeof window !== 'undefined') {
    window.React = React;
}

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, History } from 'react-router'
import { createHistory, useBasename } from 'history'
import authenticate from './auth'

import './components/styles/app.css';

const history = useBasename(createHistory)({
  basename: ''
})

const App = React.createClass({
  mixins: [ History ],

  handleSubmit (e) {
    e.preventDefault();
    if(authenticate(this.refs.username.value, this.refs.password.value)){
      this.history.pushState(null, `/success`);
    }
  },

  render () {
    return (
      <div>
        <form>
          <input ref='username' type='text' placeholder='username' />
          <input ref='password' type='password' placeholder='password' />
          <button type='submit' onClick={this.handleSubmit}> Submit </button>
        </form>
      </div>
    )
  }
})

// render(<App />, document.getElementById("app"));

class SuccessfulLogin extends React.Component {
  render() {
    return (
      <div>
        <h1>Oh hai, looks like you're authorized to be here!</h1>
      </div>
    )
  }
}

class FailedLogin extends React.Component {
  render() {
    return (
      <div>
        <h1>Your authentication failed. Please try again.</h1>
      </div>
    )
  }
}

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="success" component={SuccessfulLogin} />
      <Route path="fail" component={FailedLogin} />
    </Route>
  </Router>
), document.getElementById('app'))
