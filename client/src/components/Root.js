import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from '../containers/Register';
import Users from '../containers/Users';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route path="/(login|register)" component={Register} />
        <Route path="/users" component={Users} />
      </Fragment>
    </Router>
  </Provider>
);

export default Root;
