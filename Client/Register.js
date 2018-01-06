import React, {Component} from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';


// properties: url, onSuccess, register
export default class Login extends Component{
    constructor(properties){
        super();
        this.state = {
            message: "Create new account"
        };
    }
    submit(){
        if (this.state.password !== this.state.passwordRepeat){
            this.setState({message: "Passwords did not match!"})
        }
        else if(this.state.username && this.state.email && this.state.password){
            this.setState({message: "Loading"});

            let url = this.props.url;

            fetch(url + 'register', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })
            }).then((response) => {
                return response.json()
            }).then((data) => {
                let status = data.status;
                let message = status.charAt(0).toUpperCase() + status.slice(1) + "!";
                this.setState({message})

                // do the default on success activity
                if(data.status == 'success')
                    this.props.onSuccess();
            }).catch(() => {
                this.setState({message: "Error occurred!"})
            });
        }
    }
    render(){
        return(
            <View style={styles.page}>
                <Text style={styles.information} > { this.state.message } </Text>
                <View style={styles.form}>
                    <TextInput
                        placeholder="username"
                        onChangeText={(username) => { this.setState({username: username}) } }
                        onSubmitEditing={() => { this.refs.email.focus() } }
                        style={styles.input}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        ref="email"
                        placeholder="e-mail"
                        onChangeText={(email) => { this.setState({email: email}) } }
                        onSubmitEditing={ () => { this.refs.password.focus() } }
                        style={styles.input}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        ref="password"
                        placeholder="password"
                        onChangeText={(password) => { this.setState({password: password}) } }
                        onSubmitEditing={ () => { this.refs.passwordRepeat.focus() } }
                        style={styles.input}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        ref="passwordRepeat"
                        placeholder="repeat password"
                        onChangeText={(passwordRepeat) => { this.setState({passwordRepeat: passwordRepeat}) } }
                        onSubmitEditing={ this.submit.bind(this) }
                        style={styles.input}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity onPress={ this.submit.bind(this) } style={styles.button}>
                        <Text style={styles.buttonText}> Register </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.props.login } style={styles.buttonRegister} >
                        <Text style={styles.buttonText}> Back to Login </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        margin: 5,
        height: 40,
        fontSize: 16,
        borderWidth: 2,
        borderColor: "#BBBBBB",
        borderRadius: 50,
        backgroundColor: "#EFEFEF",
        width: "100%"
    },
    button: {
        paddingVertical: 5,
        margin: 5,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#36A9E1",
        width: "100%"
    },
    buttonText: {
        textAlign: "center",
        fontSize: 22,
        color: "#FFFFFF"
    },
    buttonRegister: {
        paddingVertical: 5,
        margin: 5,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#a3ddf1",
        width: "100%"
    },
    form: {
        width: "100%",
        maxWidth: 260
    }
});