import React, { Component } from 'react';
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
} from 'react-native'
import {
  StackNavigator,
} from 'react-navigation';
import { Container, Header, Item, Left, Body, Right, Title, Input, Icon, Content, ListItem, Separator, Button, Badge } from 'native-base';

export default class UserInfo extends Component {
  static navigationOptions = {
      title: "UserInfo",
      header: null
  };
  render() {
    return (
      <View >
           <Header style={styles.header} >
              <Left>
                <Button transparent>
                  <Icon name='menu' onPress={this.drawer} />
                </Button>
              </Left>
              <Body>
                <Title>My Account</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon  name='medkit' style={styles.medkit} />
                </Button>
              </Right>

          </Header>

          <View style={styles.container }>
               <Image source={require('./ava.jpg')} style={styles.avatar}>
               </Image>
               <Button style={styles.button} onPress={this.contactMe}>
                   <Icon active style={styles.icon} name='camera' />
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
            <Text style={styles.info}>Aaron Bennet</Text>
            </Right>
          </ListItem>
          <ListItem style={styles.list}>
            <Left>
            <Text>Birthday</Text>
            </Left>
            <Body />
            <Right>
            <Text style={styles.info}>1992/11/8</Text>
            </Right>
          </ListItem>
          <ListItem style={styles.list}>
            <Left>
            <Text>Gender</Text>
            </Left>
            <Body />
            <Right>
            <Text style={styles.info}>Male</Text>
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
            <Text style={styles.info}>176cm</Text>
            </Right>
          </ListItem>
          <ListItem style={styles.list}>
            <Left>
            <Text>Weight</Text>
            </Left>
            <Body />
            <Right>
            <Text style={styles.info}>70.0Kg</Text>
            </Right>
          </ListItem>
       </View>
       <Container style={styles.decision}>

               <Button style={styles.add} onPress={this.edit}>
                 <Icon name='ios-brush' />
                 <Text>Edit</Text>
               </Button>
               <Button   style={styles.clear} onPress={this.logout}>
                 <Icon name='ios-log-out' />
                 <Text>Logout</Text>
               </Button>


           </Container>
      </View>
  </View>
    );

  }

  drawer = () => {
this.props.navigation.navigate('Memberarea');
}

logout = () => {
this.props.navigation.navigate('Login');
}

}

const styles = StyleSheet.create({

  container:{

    flexDirection:'column',
    justifyContent: 'center',


  },
  medkit:{
    color:'red',
  },
  avatar:{
    marginTop:10,
    height:160,
    width:160,
    alignSelf:'center',
    borderWidth:3,
    borderColor:'grey',
  },
  button:{
    height:40,
    backgroundColor:'rgba(44,122,125,0.2)',
    width: 160,
    margin:5,
    justifyContent:'flex-start',
    alignSelf:'center',
    },

  text:{
    color:'grey',
    },

  icon:{
    color:'grey',
    },
  sep:{
   flex:1,
   alignSelf:'stretch',
   },
  list:{

alignSelf:'stretch',
flexDirection:'row',
 },
 info:{
   width:120,
   alignItems:'flex-end',
 },
 listV:{
   backgroundColor:'white',
 },
 decision:{
marginTop:10,
flexDirection: 'row',
justifyContent:'space-between',
  },

  add:{
marginLeft: 20,
 height:30,
  backgroundColor:'#b9d2f7',
  width: 120,
  margin:1,
  justifyContent:'center'
  },

  clear:{
    marginRight: 20,
  height:30,
  backgroundColor:'#c2c7ce',
  width: 120,
  margin:1,
    justifyContent:'center'
  },
})
