import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  AsyncStorage,
  Dimensions,
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
  Footer,
  FooterTab,
  Button,
  Badge
} from "native-base";
import call from "react-native-phone-call";
import email from 'react-native-email';

let { width, height } = Dimensions.get("window");

export default class ContactMe extends Component {
  static navigationOptions = {
    title: "ContactMe",
    header: null
  };

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
            <Title>Contact Me</Title>
          </Body>
          <Right>
            <Button transparent>
                <Icon name="menu" onPress={this.drawer} />
            </Button>
          </Right>
        </Header>

        <ImageBackground
          source={require("./b1.jpg")}
          style={styles.backgroundImage}
        >
          <View style={styles.content}>
            <Text style={styles.logo1}>A Word From Developer</Text>

            <Image
              source={require("./auth.jpg")}
              style={{
                height: 160,
                width: 200,
                flex: 0,
                alignSelf: "center",
                margin: 20
              }}
            />

            <Text   style={styles.text}>
                Hi, there. My name is Yinuo Veronica Wang, and I am the designer
              of this app. I wish it can bring a safe and enjoyable running
              experience. Please feel free to tell me how can I make
              improvements to this app. Love ya!
            </Text>

            <Button
              transparent
              textStyle={{ color: "#87838B" }}
              style={styles.action}
              onPress={this.sendEmail}
            >
              <Icon name="mail" style={{ fontSize: 30, margin: 10 }} />
              <Text style={styles.text1}>Share your experience with me!</Text>
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

         this.props.navigation.navigate("Memberarea");
  };

  sendEmail = () => {
    const to = ['yinuow1@andrew.cmu.edu', 'yinuowangnj@163.com'] // string or array my email addresses
    email(to, {
        // Optional additional arguments
        cc: ['findronniehere@gmail.com', 'doooo@daaa.com'], // string or array of email addresses
        bcc: 'jinleiw@andrew.cmu.edu', // string or array of email addresses
        subject: 'I have something to say...',
        body: 'Welcome to write down your experiences here and this email to me...'
    }).catch(console.error)
  };

}

const styles = StyleSheet.create({
  medkit: {
    color: "red"
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    alignSelf: "stretch",
    width: null,
    justifyContent: "center"
  },
  content: {
    flex:1,
    alignItems: "center",

  },
  logo1: {
    marginTop:30,
    color: "rgb(52, 85, 155)",
    fontSize: 20,
    margin: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    backgroundColor: "rgba(44,122,125,0)",
    textShadowColor: "#6292f7",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  text:{
    width: "80%",
    backgroundColor: "rgba(219,228,255,0.62)",
    margin: 5,


  },

  text1:{
marginRight:20,
  },

  action: {
    marginTop:10,
    backgroundColor: "rgba(140,186,255,0.39)",
    borderColor: "rgba(140,186,255,0.5)",
    borderWidth: 2,
    alignSelf:'center',
    width: "90%",
    borderRadius:20,
  }
});
