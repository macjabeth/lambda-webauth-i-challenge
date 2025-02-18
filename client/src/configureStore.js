import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import reducer from './reducers';

const configureStore = () =>
  createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default configureStore;
