import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const defaultEvent = {
    name: 'Loading Event',
    organisator: 'Not loaded yet',
    image: null,
    startdate: 'Not loaded yet',
    enddate: 'Not loaded yet',
    description: 'Description not loaded yet',
    transfer: 'Transfer not loaded yet',
    timetable: 'Timetable not loaded yet',
};

export default class Event extends Component{
    constructor(props){
        super();
        const menuHeader = {
            name: props.event,
            buttons: [
                {id: 'description', title: 'Description', onPress: this.setPageState.bind(this, 'description')},
                {id: 'transfer', title: 'Transfer', onPress: this.setPageState.bind(this, 'transfer')},
                {id: 'timetable', title: 'Timetable', onPress: this.setPageState.bind(this, 'timetable')}
            ]
        };

        this.state = {
            pageState: 'transfer',
            event: defaultEvent
        };

        props.setMenuHeader(menuHeader);
    }
    setPageState(pageState){
        this.setState({pageState: pageState});
    }
    loadEvent(){
        let events;
        fetch("https://lvivevent.herokuapp.com/" + 'events', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                events = data;
            });

        for(let i = 0; i < events.length; i++){
            if(events[i].name === this.props.event)
                this.state.event = events[i]
        }
    }
    render(){
        if(this.state.pageState === 'description')
            return(<Text> {this.state.event.description} </Text>);
        if(this.state.pageState === 'transfer')
            return(<Text> {this.state.event.transfer} </Text>);
        if(this.state.pageState === 'timetable')
            return(<Text> {this.state.event.timetable} </Text>);
    }
}