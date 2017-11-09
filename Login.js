import React, { Component } from "react";
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";
import firebase from "./FirebaseConfig";

export default class Login extends Component<{}> {
  static navigationOptions = {
    title: "LoginScreen",
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./run.jpg")}
          style={styles.backgroundImage}
        >
          <View style={styles.content}>
            <Text style={styles.logo1}>New Tempo</Text>

            <TextInput
              underlineColorIos="transparent"
              style={styles.input}
              text={this.state.email}
              onTextChange={email => this.setState({ email })}
              placeholder="username"
              value={this.state.email}
            />

            <TextInput
              secureTextEntry={true}
              underlineColorIos="transparent"
              style={styles.input}
              text={this.state.password}
              placeholder="password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />

            <TouchableOpacity
              onPress={this.login}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.reg} style={styles.reg}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>

            <Text style={styles.logo2}>
              You will be reminded of why you run and why you love it so much.
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "123@test.com",
      password: "123123",
      error: "",
      loading: false
    };
  }

  login = () => {
    this.setState({ error: "", loading: true });
    const { email, password } = this.state;

    if (this.state.email === "") {
      alert("Authentication failed, please enter correct email/password!");
    } else if (this.state.password === "") {
      alert("Authentication failed, please enter correct email/password!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
          this.setState({ error: "", loading: false });

          this.props.navigation.navigate("Memberarea", { userId: "Brent" });
        })
        .catch(() => {
          this.setState({ error: "Authentication failed.", loading: false });
          alert("Authentication failed, please try again!");
        });
    }
  };
  reg = () => {
    this.setState({ error: "", loading: true });
    const { email, password } = this.state;
    if (this.state.email === "") {
      alert("Registration failed, please enter correct email/password!");
    } else if (this.state.password === "") {
      alert("Registration failed, please enter correct email/password!");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ error: "", loading: false });
          this.props.navigation.navigate("Memberarea");
        })
        .catch(() => {
          this.setState({ error: "Registration failed.", loading: false });
          alert(
            "Registration failed, please check the information and try again!"
          );
        });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch"
  },
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
    justifyContent: "center"
  },
  content: {
    alignItems: "center"
  },
  logo1: {
    marginTop: 200,
    color: "white",
    fontSize: 40,
    margin: 40,
    fontStyle: "italic",
    fontWeight: "bold",
    textShadowColor: "#252525",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 5,
    marginBottom: 100,
    backgroundColor: "rgba(30,50,59,0)"
  },
  logo2: {
    padding: 60,
    color: "white",
    fontSize: 14,
    margin: 10,
    fontFamily: "Helvetica Neue",
    fontWeight: "bold",
    marginBottom: 20,
    textShadowColor: "#252525",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    backgroundColor: "rgba(30,50,59,0)"
  },

  input: {
    fontSize: 16,
    height: 40,
    borderColor: "#2C707D",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
    borderRadius: 15,
    width: 260,
    alignSelf: "center"
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center",
    padding: 10,
    marginBottom: 10,
    width: 260,
    height: 40,
    borderColor: "#fff",
    backgroundColor: "rgba(44,122,125,0.5)",
    borderRadius: 15
  },
  reg: {
    alignSelf: "center",
    padding: 10,
    marginBottom: 10,
    width: 260,
    height: 40,
    borderColor: "#fff",
    backgroundColor: "rgba(44,122,125,0.6)",
    borderRadius: 15
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center"
  }
});
