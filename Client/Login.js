import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions} from 'react-native';


// properties: url, onSuccess, register
export default class Login extends Component {
    constructor(properties) {
        super();
        this.state = {
            message: ""
        };
    }

    submit() {
        if (this.state.username && this.state.password) {
            this.setState({message: "Loading"});

            let url = this.props.url;

            fetch(url + 'login', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }).then((response) => {
                return response.json()
            }).then((data) => {
                let status = data.status;
                let message = status.charAt(0).toUpperCase() + status.slice(1) + "!";
                this.setState({message})

                // do the default on success activity
                if (data.status == 'success')
                    this.props.onSuccess();
            }).catch(() => {
                this.setState({message: "Error occurred!"})
            });
        }
    }

    render() {
        return (
            <View style={styles.page}>
                <Image source={require('./images/sp2.png')} style={styles.logo}/>
                <Text style={styles.information}> {this.state.message} </Text>
                <View style={styles.form}>
                    <TextInput
                        placeholder="Login"
                        onChangeText={(username) => {
                            this.setState({username: username})
                        }}
                        onSubmitEditing={() => {
                            this.refs.password.focus();
                        }}
                        style={styles.input}
                        returnKeyType="go"
                    />
                    <TextInput
                        ref="password"
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(password) => {
                            this.setState({password: password})
                        }}
                        onSubmitEditing={this.submit.bind(this)}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={this.submit.bind(this)} style={styles.button}>
                        <Text style={styles.buttonText}> Log in </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.registercontainer}>
                    <TouchableOpacity onPress={this.props.register}>
                        <Text style={styles.text}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.register}>
                        <Text style={styles.text}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
            ;
    }
}

const styles = StyleSheet.create({
    registercontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    page: {
        width: "100%",
        height: "100%",
        padding: "10%",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        resizeMode: "contain",
        padding: "40%",
        width: 0, height: 0
    },
    information: {
        height: 36,
        fontSize: 24,
        color: "#999999",
        textAlign: "center",
        margin: 5
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        paddingBottom: 15,
        margin: 5,
        height: 40,
        fontSize: 16,
        width: "100%"
    },
    button: {
        marginTop: 30,
        margin: 5,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#36A9E1",
        width: "100%"
    },
    buttonText: {
        paddingVertical: 7,
        textAlign: "center",
        fontSize: 17,
        color: "#FFFFFF"
    },
    text: {
        color: '#999999',
        backgroundColor: 'transparent',
        paddingHorizontal: 12,
    },
    form: {
        width: "100%",
        maxWidth: 260,
        height: 176
    }
});