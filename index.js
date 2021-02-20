/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'mobx-react';
import store from './src/service/store';

export default function Main() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
  
  AppRegistry.registerComponent(appName, () => Main);
