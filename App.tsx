/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import Home from './screens/Home';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#191a24'}}>
      <Home />
    </SafeAreaView>
  );
}

export default App;
