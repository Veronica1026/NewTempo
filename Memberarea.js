import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import { StackNavigator } from "react-navigation";
import {
  Drawer,
  Container,
  Item,
  Content,
  Header,
  Button,
  Icon,
  Badge
} from "native-base";
/**
* the entries to different function pages
*/ 
export default class Memberarea extends Component {
  static navigationOptions = {
    title: "Memberarea",
    header: null
  };

  getUserId() {
    return this.props.navigation.state.params.userId;
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./run2.jpg")}
          style={styles.backgroundImage}
        >
          <Header style={styles.header}>
            <Text style={styles.logo1}>New Tempo</Text>
          </Header>
          <View style={styles.content}>
            <Button style={styles.button} onPress={this.exercise}>
              <Icon active style={styles.icon} name="pulse" />
              <Text style={styles.text}>Run</Text>
            </Button>

            <Button style={styles.button} onPress={this.statistics}>
              <Icon active style={styles.icon} name="paper" />
              <Text style={styles.text}>Statistics</Text>
            </Button>

            <Button style={styles.button} onPress={this.myAccount}>
              <Icon active style={styles.icon} name="person" />
              <Text style={styles.text}>My Account</Text>
            </Button>

            <Button style={styles.button} onPress={this.myDiary}>
              <Icon active style={styles.icon} name="bookmarks" />
              <Text style={styles.text}>My Exercise Diary</Text>
            </Button>

            <Button style={styles.button} onPress={this.contactMe}>
              <Icon active style={styles.icon} name="paper-plane" />
              <Text style={styles.text}>Contact Me</Text>
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  }

  exercise = () => {
    this.props.navigation.navigate("Exercise");
  };

  statistics = () => {
    this.props.navigation.navigate("Statistics");
  };

  myAccount = () => {
    this.props.navigation.navigate("UserInfo");
  };

  myDiary = () => {
    this.props.navigation.navigate("MyDiary");
  };

  contactMe = () => {
    this.props.navigation.navigate("ContactMe");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  header: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(44,122,125,0)",
    marginTop: 60
  },
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
    justifyContent: "center"
  },
  content: {
    alignItems: "center",
    backgroundColor: "rgba(44,122,125,0.4)",
    alignSelf: "stretch",
    marginTop: 140,
    flex: 1
  },
  button: {
    height: 60,
    backgroundColor: "rgba(44,122,125,0)",
    width: 280,
    margin: 5,
    justifyContent: "flex-start"
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  },
  icon: {
    fontSize: 30,
    color: "white"
  },
  logo1: {
    color: "white",
    fontSize: 40,
    fontStyle: "italic",
    fontWeight: "bold",
    textShadowColor: "#252525",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 5,
    marginTop: 90,
    backgroundColor: "rgba(30,50,59,0)"
  }
});
