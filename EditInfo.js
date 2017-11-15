import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImagePickerIOS,
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
import call from 'react-native-phone-call';

export default class UserInfo extends Component {
  static navigationOptions = {
    title: "EditInfo",
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      Name: "",
      Birthday: "",
      Gender: "",
      Height: "",
      Weight: "",

    };
    const userId = 123;
    this.userRef = this.getRef().child("users/"+ userId + "/");
    this.hanleChange.bind(this);
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  hanleChange(value) {
    this.setState({ value });
  }

  pickImage() {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ image: imageUri });
    }, error => console.error(error));
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
              <Icon name="medkit" style={styles.medkit} onPress={this.callTU}/>
            </Button>
          </Right>
        </Header>

        <View style={styles.container}>
        {this.state.image?
                  <Image style={styles.avatar} source={{ uri: this.state.image }} /> :
                  <Image source={require("./ava.jpg")} style={styles.avatar} />
                }
          <Button style={styles.button} onPress={this.pickImg}>
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
          </Container>
        </View>
      </View>
    );
  }

  drawer = () => {
    this.props.navigation.dispatch({ type: "Navigation/BACK" });
  };

  pickImg = () => {
    this.pickImage();
  };

  callTU = () => {
  const callnumber = {
    number: "000", // the number to call, string value
    prompt: true // the user would not be prompt prior to the call
  };
  call(callnumber).catch(console.error);
};



  save = () => {
    var info = {
      image: this.state.image,
      Name: this.state.Name,
      Birthday: this.state.Birthday,
      Gender: this.state.Gender,
      Height: this.state.Height,
      Weight: this.state.Weight,

    };
    console.log("info:", info);
    this.userRef.update({ info });
    this.props.navigation.navigate("UserInfo");
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
    marginTop: 5,
    height: 120,
    width: 120,
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
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center"
  },

  add: {
    marginLeft: 20,
    height: 30,
    backgroundColor: "#b5dcff",
    width: 200,
    margin: 10,
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
