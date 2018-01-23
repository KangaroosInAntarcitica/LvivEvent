import React, {Component} from 'react';
import {View, ScrollView, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';

const menuHeader = {
    name: 'New Event',
    buttons: []
};

export default class NewEvent extends Component{
    constructor(props){
        super();
        this.state = {
            message: 'Fill in the information',
            organisator: 'Me'
        };

        props.setMenuHeader(menuHeader);
    }
    submit(){
        fetch("https://lvivevent.herokuapp.com/" + 'newEvent', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: this.state.name,
                organisator: this.state.organisator,
                startdate: this.state.startdate,
                enddate: this.state.enddate,
                image: this.state.image,
                address: this.state.address,
                description: this.state.description,
                transfer: this.state.transfer,
                timetable: this.state.timetable
            })
        }).then((response) => {
            return response.json()
        }).then((data) => {
            let status = data.status;
            let message = status.charAt(0).toUpperCase() + status.slice(1) + "!";
            this.setState({message});
        }).catch(() => {
            this.setState({message: "Error occurred!"})
        });
    }
    render(){
        return(
            <ScrollView>
                <Text style={styles.titleText}> {this.state.message} </Text>
                <View style={styles.boxSmall}>
                    <Text style={styles.boxSmallText}> Event Name: </Text>
                    <TextInput
                        style={styles.boxSmallInput}
                        placeholder={''}
                        onChangeText={(name) => { this.setState({name}) } }
                        onSubmitEditing={() => { this.refs.image.focus() } }
                        underlineColorAndroid={"transparent"}
                        returnKeyType={'next'}
                    />
                </View>

                <View style={styles.boxSmall}>
                    <Text style={styles.boxSmallText}> Organisator: </Text>
                    <View style={styles.boxSmallInputDisabled}>
                        <Text style={styles.boxSmallInputText}> {'Me'} </Text>
                    </View>
                </View>

                <View style={styles.boxSmall}>
                    <Text style={styles.boxSmallText}> Image url: </Text>
                    <TextInput
                        ref={'image'}
                        style={styles.boxSmallInput}
                        placeholder={''}
                        onChangeText={(image) => { this.setState({image}) } }
                        onSubmitEditing={() => { this.refs.startdate.focus() } }
                        underlineColorAndroid={"transparent"}
                        returnKeyType={'next'}
                    />
                </View>

                <View style={styles.boxSmall}>
                    <Text style={styles.boxSmallText}> Start date: </Text>
                    <TextInput
                        ref={'startdate'}
                        style={styles.boxSmallInput}
                        placeholder={''}
                        onChangeText={(startdate) => { this.setState({startdate}) } }
                        onSubmitEditing={() => { this.refs.enddate.focus() } }
                        underlineColorAndroid={"transparent"}
                        returnKeyType={'next'}
                    />
                </View>

                <View style={styles.boxSmall}>
                    <Text style={styles.boxSmallText}> End date: </Text>
                    <TextInput
                        ref={'enddate'}
                        style={styles.boxSmallInput}
                        placeholder={''}
                        onChangeText={(enddate) => { this.setState({enddate}) } }
                        onSubmitEditing={() => {  } }
                        underlineColorAndroid={"transparent"}
                        returnKeyType={'go'}
                    />
                </View>

                <View style={styles.boxSmall}>
                    <Text style={styles.boxSmallText}> Map Loctaion: </Text>
                    <View style={styles.boxSmallInputDisabled}>
                        <Text style={styles.boxSmallInputText}> {'Not supported yet'} </Text>
                    </View>
                </View>

                <View style={styles.boxLarge}>
                    <Text style={styles.boxLargeText}> Description: </Text>
                    <TextInput
                        ref={'description'}
                        multiline={true}
                        style={styles.boxLargeInput}
                        placeholder={''}
                        onChangeText={(description) => { this.setState({description}) } }
                        onSubmitEditing={() => {  } }
                        underlineColorAndroid={"transparent"}
                        returnKeyType={'go'}
                    />
                </View>

                <View style={styles.boxLarge}>
                    <Text style={styles.boxLargeText}> Transfer: </Text>
                    <TextInput
                        ref={'transfer'}
                        multiline={true}
                        style={styles.boxLargeInput}
                        placeholder={''}
                        onChangeText={(transfer) => { this.setState({transfer}) } }
                        onSubmitEditing={() => {  } }
                        underlineColorAndroid={"transparent"}
                        returnKeyType={'go'}
                    />
                </View>

                <View style={styles.boxLarge}>
                    <Text style={styles.boxLargeText}> Timetable: </Text>
                    <TextInput
                        ref={'transfer'}
                        multiline={true}
                        style={styles.boxLargeInput}
                        placeholder={''}
                        onChangeText={(timetable) => { this.setState({timetable}) } }
                        onSubmitEditing={() => {  } }
                        underlineColorAndroid={"transparent"}
                        returnKeyType={'go'}
                    />
                </View>

                <TouchableOpacity onPress={ this.submit.bind(this) } style={styles.button}>
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: '#999999',
        fontSize: 24,
        margin: 20
    },

    boxSmall: {
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 2
    },
    boxSmallText: {
        color: '#999999',
        fontSize: 20,
        padding: 5,
        width: 150
    },
    boxSmallInput: {
        fontSize: 20,
        margin: 0,
        marginLeft: 10,
        padding: 5,
        width: Dimensions.get('window').width - 180,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        color: '#777777'
    },
    boxSmallInputDisabled: {
        margin: 0,
        marginLeft: 10,
        padding: 5,
        height: 38,
        width: Dimensions.get('window').width - 180,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
    },
    boxSmallInputText: {
        fontSize: 20,
        color: '#777777'
    },

    boxLarge: {
        width: '100%',
        flexDirection: 'column',
        margin: 10,
        marginVertical: 2
    },
    boxLargeText: {
        color: '#146CB4',
        fontSize: 20,
        padding: 5,
        width: '100%'
    },
    boxLargeInput: {
        fontSize: 20,
        margin: 0,
        marginLeft: 10,
        padding: 5,
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        color: '#777777'
    },

    button: {
        width: 200,
        height: 38,
        marginVertical: 10,
        marginHorizontal: Dimensions.get('window').width / 2 - 100,
        borderRadius: 19,
        backgroundColor: "#3C97D3",
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 26,
        color: '#FFFFFF'
    }

});