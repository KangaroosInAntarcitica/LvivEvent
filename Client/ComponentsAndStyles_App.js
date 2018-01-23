import React, { Component } from 'react';
import {AppRegistry, Image, Text, View, StyleSheet} from 'react-native';

class Greeting extends Component {
    render() {
        return (
            <Text style={{color: "#FF0000", fontSize: 20}}>Hello {this.props.name}!</Text>
        );
    }
}

class Photo extends Component {
    render(){
        let source = {uri: "https://s-media-cache-ak0.pinimg.com/originals/d4/68/1b/d4681b4cb84de2550e9798eb95142e9d.jpg"};
        let width = this.props.size * 10, height = this.props.size * 8;
        return(
            <Image source={source} style={{width: width, height: height}}></Image>
        );
    }
}

class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {showText: true};

        // Toggle the state every second
        let time = 1000;
        if(this.props.time) time = this.props.time * 1000;
        setInterval(() => {
            this.setState(previousState => {
                return { showText: !previousState.showText };
            });
        }, time);
    }

    render() {
        let display = this.state.showText ? this.props.text : ' ';
        return (
            <Text>{display}</Text>
        );
    }
}

class Break extends Component{ render(){ return(<View style={{height: 20, width: "100%"}}/>); }}

export default class LotsOfGreetings extends Component {
    render() {
        return (
            <View style={{alignItems: 'center', height: "50%", backgroundColor: "#DDDDD1"}}>
                <Greeting name='Rexxar' id="Rex"/>
                <Greeting name='Jaina' />
                <Greeting name='Valeera'/>
                <Text style={styles.bigblue}> Random style </Text>
                <Photo size={5}/>
                <Photo size={2}/>

                <Break />

                <Blink text='I love to blink' time={2}/>
                <Blink text='Yes blinking is so great' />
                <Blink text='Why did they ever take this out of HTML' />
                <Blink text='Look at me look at me look at me' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30
    },
    red: {
        color: 'red',
    },
});