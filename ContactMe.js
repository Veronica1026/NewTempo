import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
} from 'react-native'
import {
  StackNavigator,
} from 'react-navigation';
import { Container, Header, Card, Item, CardItem, Thumbnail, Left, Body, Right, Title, Input, Icon, Content, Footer, FooterTab, Button, Badge } from 'native-base';

export default class ContactMe extends Component {
  static navigationOptions = {
      title: "ContactMe",
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
                <Title>Contact Me</Title>
              </Body>
              <Right>
              <Button transparent>
                <Icon  name='medkit' style={styles.medkit} />
              </Button>
              </Right>
            </Header>


             <Card style={{flex: 0}}>
                <CardItem style={styles.card}>
                    <Left>
                     <Thumbnail>
                       <Icon name="heart" style={{ color: '#ED4A6A' ,margin:5}} />
                      </Thumbnail>
                      <Body>
                         <Text>A Message From the Developer</Text>
                         <Text note>Oct 29, 2017</Text>
                      </Body>
                     </Left>
                 </CardItem>
                 <CardItem style={styles.card}>
                     <Body>
                      <Image source={require('./auth.jpg')} style={{height: 160, width: 200, flex:0, alignSelf:'center', margin: 5,}}/>
                        <Text>
                            Hi, there. My name is Yinuo Veronica Wang, and I am the designer of this app.
                            I wish it can bring a safe and enjoyable running experience for you.
                            Please feel free to tell me how can I make improvements to this app. Love ya!
                        </Text>
                     </Body>
                  </CardItem>
                  <CardItem style={styles.card}>
                    <Left>

                   <Button transparent textStyle={{color: '#87838B'}}>
                        <Icon name="mail" style={{fontSize:30, margin: 10,}} />
                        <Text>Share your experience with me!</Text>
                      </Button> 
                    </Left>
                </CardItem>
              </Card>
           </View>

    );

  }
  drawer = () => {
this.props.navigation.navigate('Memberarea');
}



}

const styles = StyleSheet.create({

  container:{

    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
medkit:{
  color:'red',
},
card:{
  borderWidth:1,
  borderColor:'#c2c7ce',
}

})
