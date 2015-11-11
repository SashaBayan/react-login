import './components/styles/app.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, History } from 'react-router';
import { createHistory, useBasename } from 'history';
import authenticate from './auth';
import SuccessfulLogin from './components/SuccessfulLogin.jsx';
import FailedLogin from './components/FailedLogin.jsx';
import { Input, Button, Row, Col } from 'react-bootstrap';

require('es6-promise').polyfill();
require('isomorphic-fetch');


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
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.refs.username.getValue(),
        password: this.refs.password.getValue(),
      }),
    })
    .then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          if (json.loggedIn === true) {
            this.history.pushState(null, `/success`);
          } else {
            this.history.pushState(null, `/fail`);
          }
        });
      }
    });
  },

  render() {
    return (
      <div className="container">
        <div className="login">
          <Row>
            <Col xs={6}>
              <Input ref="username" type="text" placeholder="username"/>
            </Col>
            <Col xs={6}>
              <Input ref="password" type="password" placeholder="password"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button bsStyle="primary" type="submit" onClick={this.handleSubmit}> Submit </Button>
            </Col>
          </Row>
        </div>
        {this.props.children}
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


