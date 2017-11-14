import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  AsyncStorage,
  Dimensions,
  TextInput
} from "react-native";
import { StackNavigator } from "react-navigation";
import {
  Container,
  Header,
  Item,
  Left,
  Body,
  Right,
  Title,
  Input,
  Icon,
  Content,
  Button,
  Badge
} from "native-base";
import firebaseApp from "./FirebaseConfig";
import call from "react-native-phone-call";
import Camera from "react-native-camera";

let { width, height } = Dimensions.get("window");

var pic1;

export default class cameraPage extends Component {
  static navigationOptions = {
    title: "cameraPage",
    header: null
  };
  constructor(props) {
    super(props);
    const userId = 123;
    this.albumRef = this.getRef().child("album/" + userId + "/");
    this.picRef = this.getRef().child("photos/" + userId + "/");
    this.getInfo();


  }
  componentDidMount() {
    this.getInfo();

  }
  getRef() {
    return firebaseApp.database().ref();
  }

  hanleChange(value) {
    this.setState({ value });
  }

  getInfo() {
    //get user information from firebase
    this.picRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        pic1 = childSnapshot.val();
        console.log("get info called");
        console.log("pic1 : ", pic1);
      });
    });
  }

  render() {
    return (
      <View>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name="ios-arrow-back" onPress={this.drawer} />
            </Button>
          </Left>
          <Body>
            <Title>Add Diary</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="medkit" style={styles.medkit} onPress={this.callTU} />
            </Button>
          </Right>
        </Header>

        <ImageBackground
          source={require("./b1.jpg")}
          style={styles.backgroundImage}
        >
          <View style={styles.content}>
            <Text style={styles.logo1}>Add a New Diary</Text>

            <Image  source={{ uri: pic1}} style={styles.result}/>


            <Button style={styles.cam} onPress={this.cam}>
              <Icon name="camera" />
              <Text>Take a pic</Text>
            </Button>

            <Button style={styles.add} onPress={this.save}>
              <Icon name="ios-add-circle" />
              <Text>Save</Text>
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  }

  callTU = () => {
    const callnumber = {
      number: "000", // the number to call, string value
      prompt: false // the user would not be prompt prior to the call
    };
    call(callnumber).catch(console.error);
  };
  drawer = () => {
 this.props.navigation.navigate("MyDiary");

  };

  cam = () => {
    this.props.navigation.navigate("camera");
    //this.props.navigation.dispatch({ type: "Navigation/BACK" });
  };
  save = () => {
    var p1="pic";
    this.albumRef.child(p1).set(pic1);

    alert("Successful!","photo saved!");

  };
}

const styles = StyleSheet.create({
  medkit: {
    color: "red"
  },

  cam: {
    height: 40,
    backgroundColor: "rgba(98,188,155,0.8)",
    width: 200,
    margin: 10,
    justifyContent: "center",
    alignSelf: "center"
  },
  add: {
    height: 40,
    backgroundColor: "rgba(178,228,255,0.8)",
    width: 200,
    margin: 10,
    justifyContent: "center",
    alignSelf: "center"
  },
  content: {
    flex: 1,
    alignItems: "center"
  },
  logo1: {
    marginTop: 30,
    color: "rgb(52, 85, 155)",
    fontSize: 20,
    margin: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    backgroundColor: "rgba(44,122,125,0)",
    textShadowColor: "#6292f7",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5
  },

  backgroundImage: {
    height: "100%",
    width: "100%",
    alignSelf: "stretch",
    width: null,
    justifyContent: "center"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "20%",
    width: "80%"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#000",
    padding: 10,
    margin: 40
  },

  result: {
    height: 160,
    width: 200,
    flex: 0,
    alignSelf: "center",
    margin: 20
  }
});
