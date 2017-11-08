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
  ListItem,
  Separator,
  Button,
  Badge
} from "native-base";
import firebaseApp from "./FirebaseConfig";

export default class UserInfo extends Component {
  static navigationOptions = {
    title: "EditInfo",
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Birthday: "",
      Gender: "",
      Month: "",
      Height: "",
      Weight: "",
      Email: ""
    };
    this.userRef = this.getRef().child("users");
    this.hanleChange.bind(this);
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  hanleChange(value) {
    this.setState({ value });
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
            <Title>Edit Profile</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="medkit" style={styles.medkit} />
            </Button>
          </Right>
        </Header>

        <View style={styles.container}>
          <Image source={require("./ava.jpg")} style={styles.avatar} />
          <Button style={styles.button} onPress={this.contactMe}>
            <Icon active style={styles.icon} name="camera" />
            <Text style={styles.text}>Add Photo</Text>
          </Button>
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
                <TextInput
                  underlineColorIos="grey"
                  style={styles.info}
                  text={this.state.Name}
                  onTextChange={Name => this.setState({ Name })}
                  placeholder="Your Name"
                  value={this.state.Name}
                  onChangeText={Name => this.setState({ Name })}
                />
              </Right>
            </ListItem>
            <ListItem style={styles.list}>
              <Left>
                <Text>Birthday</Text>
              </Left>
              <Body />
              <Right>
                <TextInput
                  underlineColorIos="grey"
                  style={styles.info}
                  text={this.state.Birthday}
                  onTextChange={Birthday => this.setState({ Birthday })}
                  placeholder="YYYY/MM/DD"
                  value={this.state.Birthday}
                  onChangeText={Birthday => this.setState({ Birthday })}
                />
              </Right>
            </ListItem>
            <ListItem style={styles.list}>
              <Left>
                <Text>Gender</Text>
              </Left>
              <Body />
              <Right>
                <TextInput
                  underlineColorIos="grey"
                  style={styles.info}
                  text={this.state.Gender}
                  onTextChange={Gender => this.setState({ Gender })}
                  placeholder="Male/Female"
                  value={this.state.Gender}
                  onChangeText={Gender => this.setState({ Gender })}
                />
              </Right>
            </ListItem>

            <ListItem style={styles.list}>
              <Left>
                <Text>Email</Text>
              </Left>
              <Body />
              <Right>
                <TextInput
                  underlineColorIos="grey"
                  style={styles.info}
                  text={this.state.Email}
                  onTextChange={Email => this.setState({ Email })}
                  placeholder="Your Email"
                  value={this.state.Email}
                  onChangeText={Email => this.setState({ Email })}
                />
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
                <TextInput
                  underlineColorIos="grey"
                  style={styles.info}
                  text={this.state.Height}
                  onTextChange={Height => this.setState({ Height })}
                  placeholder="number in cm"
                  value={this.state.Height}
                  onChangeText={Height => this.setState({ Height })}
                />
              </Right>
            </ListItem>
            <ListItem style={styles.list}>
              <Left>
                <Text>Weight</Text>
              </Left>
              <Body />
              <Right>
                <TextInput
                  underlineColorIos="grey"
                  style={styles.info}
                  text={this.state.Weight}
                  onTextChange={Weight => this.setState({ Weight })}
                  placeholder="number in Kg"
                  value={this.state.Weight}
                  onChangeText={Weight => this.setState({ Weight })}
                />
              </Right>
            </ListItem>
          </View>
          <Container style={styles.decision}>
            <Button style={styles.add} onPress={this.save}>
              <Icon name="ios-add-circle" />
              <Text>Save</Text>
            </Button>
            <Button style={styles.clear} onPress={this.clear}>
              <Icon name="trash" />
              <Text>Clear</Text>
            </Button>
          </Container>
        </View>
      </View>
    );
  }

  drawer = () => {
    this.props.navigation.dispatch({ type: "Navigation/BACK" });
  };

  logout = () => {
    this.props.navigation.navigate("Login");
  };

  add = () => {
    this.props.navigation.navigate("UserInfo");

    AlertIOS.alert("Invaid inputs!");
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
    marginTop: 10,
    height: 160,
    width: 160,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "grey"
  },
  button: {
    height: 40,
    backgroundColor: "rgba(44,122,125,0.2)",
    width: 160,
    margin: 5,
    justifyContent: "flex-start",
    alignSelf: "center"
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
    alignItems: "flex-end",
    fontSize: 14
  },
  listV: {
    backgroundColor: "white"
  },
  decision: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  add: {
    marginLeft: 20,
    height: 30,
    backgroundColor: "#bfeefc",
    width: 120,
    margin: 1,
    justifyContent: "center"
  },

  clear: {
    marginRight: 20,
    height: 30,
    backgroundColor: "#fcbfcc",
    width: 120,
    margin: 1,
    justifyContent: "center"
  }
});
