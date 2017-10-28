import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import Login from './Login';
import Memberarea from './Memberarea';
import ContactMe from './ContactMe';
import Exercise from './Exercise';
import MyDiary from './MyDiary';
import Statistics from './Statistics';
import UserInfo from './UserInfo';

export default StackNavigator({
  Login: { screen: Login},
  Memberarea: { screen: Memberarea},
  ContactMe:{ screen: ContactMe},
  Exercise:{ screen: Exercise},
  MyDiary:{ screen: MyDiary},
  Statistics:{ screen: Statistics},
  UserInfo:{ screen: UserInfo},

});
