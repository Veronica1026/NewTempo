import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import Camera from 'react-native-camera';
import { StackNavigator } from "react-navigation";
import firebaseApp from "./FirebaseConfig";
import {
  Container,
  Button,
   Icon,
} from "native-base";


class camera extends Component {
  static navigationOptions = {
  title: "camera",
  header: null
};
  constructor(props) {
    super(props);

    this.state = {
      path: null,
    };
    const userId = 123;
    this.picRef = this.getRef().child("photos/" + userId + "/");

  }

  getRef() {
     return firebaseApp.database().ref();
   }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({ path: data.path })
      })
      .catch(err => console.error(err));
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
    var pho= this.state.path;
     this.picRef.update({ pho });
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}


          <Button style={styles.add123} onPress={this.backgo}>
            <Icon name="glasses" />
            <Text>Done and Check!</Text>
          </Button>

          </View>
    );
  }

backgo = () => {

   this.props.navigation.navigate("cameraPage");
  };

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
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
  width: "80%",
  margin: 10,
  justifyContent: "center",
  position: 'absolute',
  bottom: 15,
  alignSelf:"center",

},
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 70,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});

export default camera;
