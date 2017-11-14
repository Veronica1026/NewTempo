import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Item,
  Input,
  Icon,
  Body,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge
} from "native-base";
import call from "react-native-phone-call";
import firebaseApp from "./FirebaseConfig";

var recordsAll = [];

export default class Statistics extends Component {
  static navigationOptions = {
    title: "Statistics",
    header: null
  };

  constructor(props) {
    super(props);
    const userId = 123;
    this.runRef = this.getRef().child("run/" + userId + "/");
    this.getInfo(this.runRef);
    this.calculateData();
    this.totalTime;
    this.totalDis;
    this.avrgSpd;
    this.actvt=recordsAll.length;
    console.log("totalTime: ", this.totalTime);
    console.log("totalDis: ", this.totalDis);
    console.log("avrgSpd: ", this.avrgSpd);
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  getInfo(runRef) {
    recordsAll = [];
    runRef.on("value", snap => {
      // get children as an array
      var r = [];
      snap.forEach(child => {
        r = child.val();
        recordsAll.push(r);
      });
    });
  }

  calculateData() {

    var t=0;
    var d=0;
    var v=0;

    for(var i=0;i<recordsAll.length;i++){
      var d1=parseFloat(recordsAll[i].record.distance);
      var t1=parseFloat(recordsAll[i].record.time);
      d=d+d1;
      t=t+t1;
      v=d/t;
    }
    this.totalDis=d.toFixed(4);
    this.totalTime=(t/60).toFixed(4);
    this.avrgSpd=v.toFixed(4);

  }

  render() {
    return (
      <View>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name="menu" onPress={this.drawer} />
            </Button>
          </Left>
          <Body>
            <Title>Statistics</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="medkit" style={styles.medkit} onPress={this.callTU} />
            </Button>
          </Right>
        </Header>

        <View style={styles.container}>
          <Text style={styles.header1}>Summary</Text>
          <Text style={styles.header2}>2017-10</Text>
          <Text>number of activities: {this.actvt}</Text>
          
          <Container style={styles.bar}>




              <Text>Total Time (min)</Text>
              <Text> {this.totalTime} </Text>



              <Text>Distance (Km)</Text>
              <Text>{this.totalDis}</Text>

              <Text>Average Speed (m/s)</Text>
              <Text>{this.avrgSpd}</Text>

          </Container>
        </View>
      </View>
    );
  }

  drawer = () => {
    this.props.navigation.dispatch({ type: "Navigation/BACK" });
  };

  callTU = () => {
    const callnumber = {
      number: "000", // the number to call, string value
      prompt: false // the user would not be prompt prior to the call
    };
    call(callnumber).catch(console.error);
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  medkit: {
    color: "red"
  },
  bar: {
    margin: 30,
    flexDirection: "column",
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-between"
  },
  header1: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    color: "rgba(44,122,125,0.6)"
  },
  header2: {
    fontSize: 18,
    margin: 10,
    color: "#b9d2f7",
    fontWeight: "bold"
  }
});
