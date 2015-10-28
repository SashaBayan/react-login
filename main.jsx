//enable React Devtools on Chrome and Firefox
if (typeof window !== 'undefined') {
    window.React = React;
}

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { createHistory, useBasename } from 'history'

import './components/styles/app.css';
// import { App } from './components/App.jsx';

const history = useBasename(createHistory)({
  basename: ''
})

class App extends React.Component {
  render() {
    const { pathname } = this.props.location
    return (
      <div>
        <ul>
          <li><Link to="/page1">Page 1</Link></li>
          <li><Link to="/page2">Page 2</Link></li>
        </ul>
        {React.cloneElement(this.props.children || <div />, { key: pathname })}
      </div>
    )
  }
}

// render(<App />, document.getElementById("app"));

class Page1 extends React.Component {
  render() {
    return (
      <div>
        <h1>Page 1</h1>
      </div>
    )
  }
}

class Page2 extends React.Component {
  render() {
    return (
      <div>
        <h1>Page 2</h1>
      </div>
    )
  }
}


render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="page1" component={Page1} />
      <Route path="page2" component={Page2} />
    </Route>
  </Router>
), document.getElementById('app'))
