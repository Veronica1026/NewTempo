import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Navigator } from "react-native";
import { StackNavigator } from "react-navigation";
import App from "./App";
import Memberarea from "./Memberarea";
import Login from "./Login";
import ContactMe from "./ContactMe";
import Exercise from "./Exercise";
import MyDiary from "./MyDiary";
import Statistics from "./Statistics";
import UserInfo from "./UserInfo";
import EditInfo from "./EditInfo";
import cameraPage from "./cameraPage";
import camera from "./camera";

export default class Project extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ id: "App" }}
        renderScene={this.navigatorRenderScene}
      />
    );
  }

  navigatorRenderScene(route, navigator) {
    return <App navigator={navigator} />;
  }
}

AppRegistry.registerComponent("NewTempo", () => App);
