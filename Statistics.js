import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
    Dimensions,
  TouchableOpacity,
  ImageBackground
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
let { width, height } = Dimensions.get("window");
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
            <Icon name="medkit" style={styles.medkit} onPress={this.callTU}/>
            </Button>
          </Left>
          <Body>
            <Title>Statistics</Title>
          </Body>
          <Right>
          <Button transparent onPress={this.drawer}>
            <Icon name="menu" />

            </Button>
          </Right>
        </Header>
        <ImageBackground
                  source={require("./b1.jpg")}
                  style={styles.backgroundImage}
                >
        <View style={styles.container}>
          <Text style={styles.header1}>Summary</Text>

          <Text style={styles.header2}>number of activities: {this.actvt}</Text>

          <Container style={styles.bar}>




              <Text style={styles.header3}>Total Time (min)</Text>
              <Text style={styles.data}> {this.totalTime} </Text>



              <Text style={styles.header3}>Distance (Km)</Text>
              <Text style={styles.data}>{this.totalDis}</Text>

              <Text style={styles.header3}>Average Speed (m/s)</Text>
              <Text style={styles.data}>{this.avrgSpd}</Text>

          </Container>
        </View>
          </ImageBackground>
      </View>
    );
  }

  drawer = () => {
      this.props.navigation.navigate("Memberarea");
  };

  callTU = () => {
    const callnumber = {
      number: "000", // the number to call, string value
      prompt: true // the user would not be prompt prior to the call
    };
    call(callnumber).catch(console.error);
  };
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: "100%",
    alignSelf: "stretch",
    width: null,
    justifyContent: "center"
  },
  container: {
    flex:1,
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

  },
  header1: {
    textShadowColor: "#6292f7",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    color: "rgb(52, 85, 155)",
    fontSize: 20,
    margin: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    backgroundColor: "rgba(44,122,125,0)",

  },
  header2: {
    alignSelf:'center',
    fontSize: 18,
    margin: 10,
    color: "#4286f4",
    fontWeight: "bold",
    backgroundColor: "rgba(217,230,252,0.5)",
  },

  header3: {
    alignSelf:'center',
    fontSize: 16,
    margin: 5,
    color: "#024e51",
    fontWeight: "bold",
  backgroundColor: "rgba(44,122,125,0)",
},
data: {
  alignSelf:'center',
  fontSize: 16,
  margin: 5,
  color: "#065b49",
backgroundColor: "rgba(213,239,234,0.5)",
}

});
