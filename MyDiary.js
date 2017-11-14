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
  TouchableOpacity,
  Dimensions
} from "react-native";
import { StackNavigator } from "react-navigation";
import {
  Container,
  DeckSwiper,
  Card,
  Header,
  CardItem,
  Thumbnail,
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
import firebaseApp from "./FirebaseConfig";

var pics=[];
var card=[]

let { width, height } = Dimensions.get("window");



export default class MyDiary extends Component {
  static navigationOptions = {
    title: "MyDiary",
    header: null
  };

  constructor(props) {

     super(props);

     const userId = 123;
     this.albumRef = this.getRef().child("album/"+ userId + "/");
     this.getInfo();
     console.log("pics: ", pics);
     this.assign();
     console.log("cards: ", card);
   }


   componentDidMount() {
     this.getInfo();
     this.assign();
   }

   getRef() {
     return firebaseApp.database().ref();
   }


       getInfo() {
          pics=[];
         //get user information from firebase
         this.albumRef.on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
             var p1 = childSnapshot.val();
           pics.push({p1});

           });
         });
       }


  render() {
    return (
      <Container>
        <View>
          <Header style={styles.header}>
            <Left>
              <Button transparent>
              <Icon
                name="medkit"
                style={styles.medkit}
                onPress={this.callTU}
              />
              </Button>
            </Left>
            <Body>
              <Title>My Diary</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="menu" onPress={this.drawer} />

              </Button>
            </Right>
          </Header>

          <View style={styles.cards}>
            <DeckSwiper
              ref={c => (this._deckSwiper = c)}
              dataSource={card}
              renderEmpty={() => (
                <View style={{ alignSelf: "center" }}>
                  <Text>Over</Text>
                </View>
              )}
              renderItem={item => (
                <Card style={{ elevation: 3 }}>
                  <CardItem cardBody>
                    <Image
                      style={{ height: 300, flex: 1 }}
                      source={item.image}
                    />
                  </CardItem>
                </Card>
              )}
            />
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Button
            onPress={() => this._deckSwiper._root.swipeLeft()}
            style={styles.button}
          >
            <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            <Text>Swipe</Text>
            <Icon style={{ marginRight: 10 }} name="arrow-forward" />
          </Button>
          <Button onPress={this.cameraPage} style={styles.button1}>
            <Icon style={{ marginLeft: 10 }} name="camera" />
            <Text style={{ marginRight: 10 }}>Add One Pic</Text>
          </Button>
        </View>
      </Container>
    );
  }

  drawer = () => {

     this.props.navigation.navigate("Memberarea");
  };
cameraPage= () => {

   this.props.navigation.navigate("cameraPage");
};
  assign=()=> {
card=[];
  card.push({image:require("./sea.jpg")});
    card.push({image:require("./tree.jpg")});
      card.push({image:require("./night.jpg")});
        card.push({image:require("./sky1.jpg")});

var temp=("uri: ",pics).toString();

      card.push({image: {temp}});

  }

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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  medkit: {
    color: "red"
  },
  button: {
    height: 40,
    backgroundColor: "rgba(44,122,125,0.2)",
    width: 140,
    margin: 10,
    justifyContent: "space-between",
    alignSelf: "center"
  },

  button1: {
    height: 40,
    backgroundColor: "#b9d2f7",
    width: 140,
    margin: 10,
    justifyContent: "space-between",
    alignSelf: "center"
  },
  cards: {
    marginTop: 30
  }
});
