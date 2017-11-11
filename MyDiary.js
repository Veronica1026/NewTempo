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
import call from 'react-native-phone-call';

const cards = [
  {
    text: "Sea",
    name: "2017-11-24",
    image: require("./sea.jpg")
  },
  {
    text: "Night",
    name: "2017-10-17",
    image: require("./night.jpg")
  },
  {
    text: "Tree",
    name: "2017-09-27",
    image: require("./tree.jpg")
  }
];

export default class MyDiary extends Component {
  static navigationOptions = {
    title: "MyDiary",
    header: null
  };

  render() {
    return (
      <Container>
        <View>
          <Header style={styles.header}>
            <Left>
              <Button transparent>
                <Icon name="menu" onPress={this.drawer} />
              </Button>
            </Left>
            <Body>
              <Title>My Diary</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="medkit" style={styles.medkit} onPress={this.callTU}/>
              </Button>
            </Right>
          </Header>

          <View>
            <DeckSwiper
              ref={c => (this._deckSwiper = c)}
              dataSource={cards}
              renderEmpty={() => (
                <View style={{ alignSelf: "center" }}>
                  <Text>Over</Text>
                </View>
              )}
              renderItem={item => (
                <Card style={{ elevation: 3 }}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={item.image} />
                      <Body>
                        <Text>{item.text}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      style={{ height: 300, flex: 1 }}
                      source={item.image}
                    />
                  </CardItem>
                  <CardItem>
                    <Icon name="heart" style={{ color: "#ED4A6A" }} />
                    <Text>{item.name}</Text>
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
            iconLeft
            onPress={() => this._deckSwiper._root.swipeLeft()}
            style={styles.button}
          >
            <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            <Text style={{ marginRight: 10 }}>Swipe Left</Text>
          </Button>
          <Button
            iconRight
            onPress={() => this._deckSwiper._root.swipeRight()}
            style={styles.button}
          >
            <Icon style={{ marginLeft: 10 }} name="arrow-forward" />
            <Text style={{ marginRight: 10 }}>Swipe Right</Text>
          </Button>
        </View>

      </Container>
    );
  }

  drawer = () => {
    this.props.navigation.dispatch({ type: "Navigation/BACK" });
  };

  callTU = () => {
const callnumber = {
  number: "0405416669", // the number to call, string value
  prompt: true // the user would be prompt prior to the call
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
    alignSelf: "center",
    margin: 10
  }
});
