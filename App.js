/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';




export default class App extends Component<{}> {
  render() {
    return (
      <MapView  provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={{
          latitude:-34.9285,
          longitude:138.6007,
          latitudeDelta: 0.0922,
          longitudeDelta:0.0421,
        }}
        >
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'70%',
    width:'100%',
  },

});