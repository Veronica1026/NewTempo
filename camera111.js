import React, { Component } from "react";
import { Text, StyleSheet, Image, View, Dimensions } from "react-native";
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
  Badge,
  TextInput
} from "native-base";
import firebaseApp from "./FirebaseConfig";

import Camera from "react-native-camera";

let { width, height } = Dimensions.get("window");
var pic = "picture";
export default class camera extends Component {
  static navigationOptions = {
    title: "camera",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
      camera: Camera.constants.CaptureMode.camera
    };
    const userId = 123;
    this.picRef = this.getRef().child("photos/" + userId + "/");
    this.hanleChange.bind(this);
  }





  getRef() {
    return firebaseApp.database().ref();
  }

  hanleChange(value) {
    this.setState({ value });
  }

  takePicture() {
    this.camera
      .capture()
      .then(data => {
        console.log(data.path),
          this.setState({ show: true }),
          this.setState({ photo: data.path });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.content}>

        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}
        >
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
            CAPTURE
          </Text>
        </Camera>


        <View style={styles.decision}>
          <Button style={styles.add123} onPress={this.showSTA}>
            <Icon name="glasses" />
            <Text>Done and Check!</Text>
          </Button>
        </View>
      </View>
    );
  }

  //
  // takeOnePic = () => {
  // this.takePicture.bind(this);
  // console.log(this.state.photo);
  // // this.picRef.push({ this.state.photo });
  // // this.drawer();
  // };



  showSTA = () => {
    console.log("save called ");
    console.log("photo: ", this.state.photo);
    var path = this.state.photo;
    this.picRef.update({ path });
    this.drawer();
  };
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center"
  },

  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "60%",
    width: "100%"
  },

  decision: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  add123: {
    marginLeft: 20,
    height: 30,
    backgroundColor: "rgba(178,228,255,1)",
    width: 200,
    margin: 10,
    justifyContent: "center"
  },

  capture: {
    flex: 0,
    backgroundColor: "rgba(178,228,255,1)",
    justifyContent: "center",
    borderRadius: 5,
    color: "#000",
    padding: 10,
    margin: 40
  }
});
