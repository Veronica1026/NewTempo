import React, { Component } from "react";
import SideBar from "./Memberarea";
import {
  AppRegistry,
  StyleSheet,
  Platform,
  Text,
  View,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import {
  Drawer,
  Container,
  Header,
  Item,
  Left,
  Input,
  Body,
  Right,
  Title,
  Icon,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge
} from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import firebaseApp from "./FirebaseConfig";
import call from "react-native-phone-call";

let { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Exercise extends Component {
  static navigationOptions = {
    title: "Exercise",
    header: null
  };

  constructor() {
    super();
    this.watchID = null;
    this.positions = [];
    this.distance = 0;// initialize the value to be zero
    this.totalTime = 0;// initialize the value to be zero
     this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
    const userId = 123;
    this.runRef = this.getRef().child("run/" + userId + "/"); //the firebase node which records the user's running records
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition(position => {
      this.positions.push(position);//get the longtitude and latitude of every spot once the user is detected to have moved
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name="medkit" style={styles.medkit} onPress={this.callTU} />
            </Button>
          </Left>
          <Body>
            <Title>Run</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.drawer}>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.containerM}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={region => this.setState({ region })}
          onRegionChangeComplete={region => this.setState({ region })}
        >
          <MapView.Marker coordinate={this.state.region} />
        </MapView>

        <View style={styles.container}>
          <Button style={styles.button1} onPress={this.start}>
            <Icon active style={styles.icon} name="ios-walk" />
            <Text style={styles.text}>Start!</Text>
          </Button>
          <Button style={styles.button2} onPress={this.finish}>
            <Icon active style={styles.icon} name="md-happy" />
            <Text style={styles.text}>Finish!</Text>
          </Button>
        </View>
      </View>
    );
  }
  drawer = () => {
    this.props.navigation.navigate("Memberarea");
  };

  start = () => {
    Alert.alert("Go! Go! Go!", "Timing and location tracking started!");
    this.distance = 0;//set the value to zero in case it already has values of the last time running
    this.totalTime = 0;//set the value to zero in case it already has values of the last time running
    this.positions.length = 0;//set the value to zero in case it already has values of the last time running
  };

  callTU = () => {
    const callnumber = {
      number: "000", // the number to call, string value
      prompt: true // the user would be prompted prior to the call
    };
    call(callnumber).catch(console.error);
  };

  finish = () => {
    //calculate total time duration
    this.totalTime =
      (this.positions[this.positions.length - 1].timestamp -
        this.positions[0].timestamp) /
      1000;

    // calculate distances
    var p = 0.017453292519943295; // this number is (Math.PI / 180)
    var c = Math.cos;
    var a, d, avgSpeed;
    var sum = 0;

    //using Haversine formula to calculate the sum of distances of every pair of two near location points
    for (i = 0; i < this.positions.length - 1; i++) {
      a =
        0.5 -
        c(
          (this.positions[i + 1].coords.latitude -
            this.positions[i].coords.latitude) *
            p
        ) /
          2 +
        c(this.positions[i].coords.latitude * p) *
          c(this.positions[i + 1].coords.latitude * p) *
          (1 -
            c(
              (this.positions[i + 1].coords.longitude -
                this.positions[i].coords.longitude) *
                p
            )) /
          2;
      d = 12742 * Math.asin(Math.sqrt(a));
      sum += d;
    }
    this.distance = sum;
    //calculate the average speed using the total distance and total time, and the unit is converted to meters per second.
    avgSpeed = this.distance * 1000 / this.totalTime;
    Alert.alert(
      "Well done!",
      "Distance: " +
        this.distance.toFixed(4) +
        " Km" +
        "\n" +
        "Time: " +
        this.totalTime.toFixed(4) +
        " s" +
        "\n" +
        "Average Speed: " +
        avgSpeed.toFixed(4) +
        " m/s"
    );

    // now we need to push this.distance, this.totalTime and avgSpeed to firebase
    var record = {
      distance: this.distance.toFixed(4),
      time: this.totalTime.toFixed(4),
      speed: avgSpeed.toFixed(4)
    };
    this.runRef.push({ record });
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  containerM: {
    height: "68%",
    width: "100%"
  },
  medkit: {
    color: "red"
  },
  button1: {
    height: 40,
    backgroundColor: "rgba(44,122,125,0.4)",
    width: 240,
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10
  },
  button2: {
    height: 40,
    backgroundColor: "#b9d2f7",
    width: 240,
    margin: 5,
    justifyContent: "center",
    alignSelf: "center"
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  },
  icon: {
    fontSize: 30,
    color: "white"
  }
});
