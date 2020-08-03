/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MainNavigation from './navigation/main-navigation';
// REDUX
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
// REDUX DEV-TOOLS EXTENSION PLUGIN
import {composeWithDevTools} from 'redux-devtools-extension';
// REDUX THUNK FOR ASYNC ACTIONS
import thunk from 'redux-thunk';
// REDUCER
import RootReducer from './store/reducers/index';

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
