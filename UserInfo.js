import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity
} from "react-native";
import {
  StackNavigator,
  NavigationActions
} from "react-navigation";
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
  ListItem,
  Separator,
  Button,
  Badge
} from "native-base";
import call from 'react-native-phone-call'
import firebaseApp from "./FirebaseConfig";


var information=[];

export default class UserInfo extends Component {
  static navigationOptions = {
    title: "UserInfo",
    header: null
  };

  constructor(props) {
    super(props);
    const userId = 123;
    this.userRef = this.getRef().child("users/"+ userId + "/");
    this.getInfo();

  }
  componentDidMount() {
    this.getInfo();
  }

  getRef() {
    return firebaseApp.database().ref();
  }

getInfo(){
  //get user information from firebase
  this.userRef.on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
     information = childSnapshot.val();

  });
});
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
            <Title>My Account</Title>
          </Body>
          <Right>
          <Button transparent>
            <Icon name="menu" onPress={this.drawer} />
          </Button>

          </Right>
        </Header>

        <View style={styles.container}>

        {information.image?
                  <Image style={styles.avatar} source={{ uri: information.image }} /> :
                  <Image source={require("./ava.jpg")} style={styles.avatar} />
                }



          <View style={styles.listV}>
            <Separator bordered style={styles.sep}>
              <Text>Basic Information</Text>
            </Separator>
            <ListItem style={styles.list}>
              <Left>
                <Text>Name</Text>
              </Left>
              <Body />
              <Right>
                <Text style={styles.info}>{information.Name}</Text>
              </Right>
            </ListItem>
            <ListItem style={styles.list}>
              <Left>
                <Text>Birthday</Text>
              </Left>
              <Body />
              <Right>
                <Text style={styles.info}>{information.Birthday}</Text>
              </Right>
            </ListItem>
            <ListItem style={styles.list}>
              <Left>
                <Text>Gender</Text>
              </Left>
              <Body />
              <Right>
                <Text style={styles.info}>{information.Gender}</Text>
              </Right>
            </ListItem>



            <Separator bordered style={styles.sep}>
              <Text>Health Parameters</Text>
            </Separator>
            <ListItem style={styles.list}>
              <Left>
                <Text>Height</Text>
              </Left>
              <Body />
              <Right>
                <Text style={styles.info}>{information.Height}</Text>
              </Right>
            </ListItem>
            <ListItem style={styles.list}>
              <Left>
                <Text>Weight</Text>
              </Left>
              <Body />
              <Right>
                <Text style={styles.info}>{information.Weight}</Text>
              </Right>
            </ListItem>
          </View>
          <Container style={styles.decision}>
            <Button style={styles.add} onPress={this.edit}>
              <Icon name="ios-brush" />
              <Text>Edit</Text>
            </Button>
            <Button style={styles.clear} onPress={this.logout}>
              <Icon name="ios-log-out" />
              <Text>Logout</Text>
            </Button>
          </Container>
        </View>
      </View>
    );
  }

  drawer = () => {

   this.props.navigation.navigate("Memberarea");
    //this.props.navigation.dispatch({ type: "Navigation/BACK" });
  };

  callTU = () => {
  const callnumber = {
    number: "000", // the number to call, string value
    prompt: false // the user would not be prompt prior to the call
  };
  call(callnumber).catch(console.error);
};

  logout = () => {
    this.props.navigation.navigate("Login");
  };

  edit = () => {
    this.props.navigation.navigate("EditInfo");
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center"
  },
  medkit: {
    color: "red"
  },
  avatar: {
    margin: 10,
    height: 120,
    width: 120,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "grey"
  },


  text: {
    color: "grey"
  },

  icon: {
    color: "grey"
  },
  sep: {
    flex: 1,
    alignSelf: "stretch"
  },
  list: {
    alignSelf: "stretch",
    flexDirection: "row"
  },
  info: {
    width: 120,
    alignItems: "flex-end"
  },
  listV: {
    marginTop: 10,
    backgroundColor: "white"
  },
  decision: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  add: {
    marginLeft: 20,
    height: 30,
    backgroundColor: "#b9d2f7",
    width: 120,
    margin: 10,
    justifyContent: "center"
  },

  clear: {
    marginRight: 20,
    height: 30,
    backgroundColor: "#c2c7ce",
    width: 120,
    margin: 10,
    justifyContent: "center"
  }
});
