import React, {Component} from 'react';
import { Header, AppRegistry, Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';


// properties: url, onSuccess, register
export default class Login extends Component{
    constructor(properties){
        super();
        this.state = {
            message: ""
        };
    }
    submit(){
        if (this.state.password !== this.state.passwordRepeat){
            this.setState({message: "Wrong password repeat!"})
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
            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={{width: 50, height: 50}} onPress={this.props.login} >
                        <Image style={{width: 30, height: 30, position: 'absolute', top: 10, left: 10}} source={require('./images/backArrow.png')} />
                    </TouchableOpacity>
                    <Text style={{color: '#FFFFFF', fontSize: 24, padding: 10}}> Registration </Text>
                    <View style={{width: 50}}/>
                </View>
                <View style={styles.page}>
                    <Text style={styles.information} > { this.state.message } </Text>
                    <View style={styles.form}>
                        <TextInput
                            placeholder="username"
                            onChangeText={(username) => { this.setState({username: username}) } }
                            onSubmitEditing={() => { this.refs.email.focus() } }
                            style={styles.input}
                        />
                        <TextInput
                            ref="email"
                            placeholder="e-mail"
                            onChangeText={(email) => { this.setState({email: email}) } }
                            onSubmitEditing={ () => { this.refs.password.focus() } }
                            style={styles.input}
                        />
                        <TextInput
                            ref="password"
                            secureTextEntry
                            placeholder="password"
                            onChangeText={(password) => { this.setState({password: password}) } }
                            onSubmitEditing={ () => { this.refs.passwordRepeat.focus() } }
                            style={styles.input}
                        />
                        <TextInput
                            ref="passwordRepeat"
                            secureTextEntry
                            placeholder="repeat password"
                            onChangeText={(passwordRepeat) => { this.setState({passwordRepeat: passwordRepeat}) } }
                            onSubmitEditing={ this.submit.bind(this) }
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={ this.submit.bind(this) } style={styles.button}>
                            <Text style={styles.buttonText}> Register </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
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
        width: '100%',
        height: Dimensions.get('window').height - 50,
        padding: "10%",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
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
    },

    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#36A9E1',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});