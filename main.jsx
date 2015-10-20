//enable React Devtools on Chrome and Firefox
if (typeof window !== 'undefined') {
    window.React = React;
}

import React from 'react';
import { App } from './components/App.jsx';

React.render(<App />, document.getElementById("app"));