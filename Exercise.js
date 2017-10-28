import React, { Component } from 'react';

import SideBar from './Memberarea';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
} from 'react-native'
import { Drawer, Container, Header, Item, Left,Input, Body, Right, Title, Icon, Content, Footer, FooterTab, Button, Badge } from 'native-base';
import Map from "./MapContainer/Map"

export default class Exercise extends Component {
  static navigationOptions = {
      title: "Exercise",
      header: null
  };
render() {
  const region = {
    latitude:-34.9326,
    longtitude:138.5991,
    latitudeDelta:0.043,
    longtitudeDelta:0.034
  }

return (

  <View >
  <Header style={styles.header} >
          <Left>
          <Button transparent onPress={this.drawer}>
            <Icon name='menu'/>
          </Button>
          </Left>
          <Body>
            <Title>Run</Title>
          </Body>
          <Right>
          <Button transparent>
            <Icon  name='medkit' style={styles.medkit} />
          </Button>
          </Right>

        </Header>
      <View style={styles.container }>
        <Container>
            <Map region={region}/>
        </Container>
      <Button style={styles.button1} >
          <Icon active style={styles.icon} name='ios-walk' />
          <Text style={styles.text}>Start!</Text>
      </Button>

      <Button style={styles.button2} >
          <Icon active style={styles.icon} name='md-happy' />
          <Text style={styles.text}>Finish!</Text>
      </Button>
      </View>
      </View>

    );

  }
    drawer = () => {
  this.props.navigation.navigate('Memberarea');
}
}

const styles = StyleSheet.create({

  container:{

    justifyContent: 'center',
    alignItems: 'center',

  },

  medkit:{
    color:'red',
  },
  button1:{
    height:60,
    backgroundColor:'rgba(44,122,125,0.4)',
    width: 240,
    margin:5,
    justifyContent:'center',
    alignSelf:'center',
    },
    button2:{
      height:60,
      backgroundColor:'#b9d2f7',
      width: 240,
      margin:5,
      justifyContent:'center',
      alignSelf:'center',
      },

  text:{
fontSize:15,
fontWeight: 'bold',
 color:'white',
    },

  icon:{
 fontSize:30,
 color:'white',
    },


});
