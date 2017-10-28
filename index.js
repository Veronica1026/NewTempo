import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import App from './App';
import Memberarea from './Memberarea';
import Login from './Login';
import ContactMe from './ContactMe';
import Exercise from './Exercise';
import MyDiary from './MyDiary';
import Statistics from './Statistics';
import UserInfo from './UserInfo';


export default class Project extends Component {
  render() {
    return (
      <Navigator initialRoute={{id: 'App'}}
        renderScene = {this.navigatorRenderScene} />
    );
  }

    navigatorRenderScene(route, navigator){
       _navigator = navigator;
       switch(route.id){
          case 'App':
              return(<App navigator = {navigator}/>);
            case 'Login':
              return(<Login navigator = {navigator}/>);
            case 'Memberarea':
              return(<Memberarea navigator = {navigator}/>);
              case 'ContactMe':
              return(<ContactMe navigator = {navigator}/>);
              case 'Exercise':
              return(<Exercise navigator = {navigator}/>);
              case 'MyDiary':
              return(<MyDiary navigator = {navigator}/>);
              case 'Statistics':
              return(<Statistics navigator = {navigator}/>);
              case 'UserInfo':
              return(<UserInfo navigator = {navigator}/>);
      }
  }
}



AppRegistry.registerComponent('NewTempo', () => App);
