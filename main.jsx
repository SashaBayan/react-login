import React from 'react';
import { render } from 'react-dom';
import { Router, Route, History } from 'react-router';
import { createHistory, useBasename } from 'history';
import authenticate from './auth';
import SuccessfulLogin from './components/SuccessfulLogin.jsx';
import FailedLogin from './components/FailedLogin.jsx';

import './components/styles/app.css';

// enable React Devtools on Chrome and Firefox
if (typeof window !== 'undefined') {
  window.React = React;
}


const history = useBasename(createHistory)({
  basename: '',
});

const App = React.createClass({
  mixins: [ History ],

  handleSubmit(event) {
    event.preventDefault();
    if (authenticate(this.refs.username.value, this.refs.password.value)) {
      this.history.pushState(null, `/success`);
    } else {
      this.history.pushState(null, `/fail`);
    }
  },

  render() {
    return (
      <div>
        <form>
          <input ref="username" type="text" placeholder="username" />
          <input ref="password" type="password" placeholder="password" />
          <button type="submit" onClick={this.handleSubmit}> Submit </button>
        </form>
      </div>
    );
  },
});

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="success" component={SuccessfulLogin} />
      <Route path="fail" component={FailedLogin} />
    </Route>
  </Router>
), document.getElementById('app'));
