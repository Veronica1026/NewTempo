import React, { Component } from 'react';
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
import {
  StackNavigator,
} from 'react-navigation';
import { Container, Header, Title, Left, Right, Item, Input, Icon, Body, Content, Footer, FooterTab, Button, Badge } from 'native-base';

export default class Statistics extends Component {
  static navigationOptions = {
      title: "Statistics",
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
              <Title>Statistics</Title>
            </Body>
            <Right>
            <Button transparent>
              <Icon  name='medkit' style={styles.medkit} />
            </Button>
            </Right>
          </Header>

        <View style={styles.container }>


                    <Text style={styles.header1 }>Monthly Summary</Text>
                    <Text style={styles.header2 }>2017-10</Text>
                    <Text>3 activities</Text>
<Container style={styles.bar}>
                    <Left>
                    <Text>Total Duration</Text>
                    <Text>5 hour 20 min</Text>
                    </Left>
                    <Body />
                    <Right>
                    <Text>Distance</Text>
                    <Text>6.72 Km</Text>
                    </Right>
</Container>





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
  bar:{
    margin:30,
    flexDirection:'row',
    flex:1,
    alignSelf:'stretch',
    justifyContent:'space-between',
  },
  header1:{
    fontSize:20,
    fontWeight:'bold',
    margin:20,
    color:'rgba(44,122,125,0.6)',
  },
  header2:{
    fontSize:18,
    margin:10,
    color:'#b9d2f7',
    fontWeight:'bold',
  },
})
