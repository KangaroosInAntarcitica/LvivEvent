import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions, Alert} from 'react-native';

const testEvents = [
    {name: "Event", startdate: "2017-2-12", enddate: "2017-2-13", organisator: 'Me', image: "http://wnmu.edu/wp-content/uploads/Dollarphotoclub_90921785.jpg"},
    {name: "Lekciya Shcherbiny", startdate: "2017-2-12", enddate: "2017-2-13", organisator: 'Shcherbina', image: "https://pbs.twimg.com/media/CmWhqb6WIAAj4L3.jpg"},
    {name: "Boring event", startdate: "2017-2-12", enddate: "2017-2-13", organisator: 'Me', image: "http://latinaswhotravel.com/wp-content/uploads/2017/07/Latinas-Who-Travel-Meet-ups-and-Events.jpg"},
    {name: "Nothing", startdate: "2017-2-12", enddate: "2017-2-13", image: "http://wnmu.edu/wp-content/uploads/Dollarphotoclub_90921785.jpg"},
];

const menuHeader = {
    name: 'Events',
    buttons: [
        {id: 'events', title: 'Events', onPress: (id) => {Alert.alert('Info', 'Events are already shown to you!')}}
    ]
};

class EventInfo extends Component{
    render(){
        return(
            <View style={styles.eventInfo}>
                <Image source={require('./images/eventFront.png')} style={styles.backgroundImage}/>
                {this.props.organisator ?
                    <View style={styles.infoOrganisator}>
                        <Image style={styles.infoPicture} source={require('./images/person.png')}/>
                        <Text style={styles.infoText}> {this.props.organisator} </Text>
                    </View>
                    : null}
                {this.props.startdate ?
                    <View style={styles.infoTime}>
                        <Image style={styles.infoPicture} source={require('./images/time.png')}/>
                        <Text style={styles.infoText}> {this.props.startdate}</Text>
                    </View>
                    : null}
            </View>
        );
    }
}

class EventDetails extends Component{
    render(){
        return(
            <View style={styles.details}>
                <View style={styles.detailsItem}>
                    <Image style={styles.detailsImage} source={require('./images/person.png')}/>
                    <Text style={styles.detailsTextName}> Organisator: </Text>
                    <Text style={styles.detailsText}> {this.props.organisator || 'unknown'} </Text>
                </View>
                <View style={styles.detailsItem}>
                    <Image style={styles.detailsImage} source={require('./images/time.png')}/>
                    <Text style={styles.detailsTextName}> Start date: </Text>
                    <Text style={styles.detailsText}> {this.props.startdate || 'unknown'} </Text>
                </View>
                <View style={styles.detailsItem}>
                    <Image style={styles.detailsImage} source={require('./images/time.png')}/>
                    <Text style={styles.detailsTextName}> End date: </Text>
                    <Text style={styles.detailsText}> {this.props.enddate || 'unknown'} </Text>
                </View>
            </View>
        );
    }
}

class Event extends Component{
    state = {open: false};
    open(){
        // toggle open
        this.setState({open: ! this.state.open})
    }
    render(){
        return(
            <View style={styles.event}>
                { this.props.image ? <Image style={styles.eventImage} source={{uri: this.props.image}}/> : null }

                { this.state.open ?
                    <EventDetails organisator={this.props.organisator}
                                  startdate={this.props.startdate} enddate={this.props.enddate}/>
                    : null }

                <View style={styles.eventTextBox}>
                    <Text style={styles.eventText}> {this.props.name} </Text>
                    <View style={styles.eventButtons}>
                        <TouchableOpacity style={styles.moreButton} onPress={this.props.onPress}>
                            <Text style={styles.moreText}> More </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.extendButton} onPress={this.open.bind(this)}>
                            {this.state.open ?
                                <Image style={styles.extendImage} source={require('./images/arrowLeft.png')}/>
                                : <Image style={styles.extendImage} source={require('./images/arrowTop.png')}/>
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                {this.state.open ? null :
                    <EventInfo organisator={this.props.organisator}
                               startdate={this.props.startdate} enddate={this.props.enddate} />
                }
            </View>
        )
    }
}

export default class EventsList extends Component{
    constructor(props){
        super();
        this.state = {data: testEvents};
        this.getEvents.call(this);

        // set menu header to default menu header for events
        props.setMenuHeader(menuHeader);
    }
    getEvents(){
        fetch("https://lvivevent.herokuapp.com/" + 'events', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ data })
            });
    }
    renderItem({item}){
        return <Event
            name={item.name}
            image={item.image}
            startdate={item.startdate}
            enddate={item.enddate}
            organisator={item.organisator}
            onPress={() => {this.props.setMenu('event', item.name)}}
        />
    }
    render() {
        return (
            <FlatList
                contentContainerStyle={styles.list}
                data={this.state.data}
                keyExtractor={ (item, index) => item.name }
                renderItem={this.renderItem.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
    eventImage: {
        paddingHorizontal: '50%',
        paddingVertical: '20%',
        resizeMode: 'cover'
    },
    list: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 4
    },
    event: {
        width: Dimensions.get('window').width,
        marginVertical: 4
    },
    eventTextBox: {
        height: 40,
        backgroundColor: '#B3DEF8',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    eventText: {
        textAlign: 'left',
        fontSize: 20,
        color: "#2E72A0",
        padding: 4,
        paddingHorizontal: 10
    },
    eventInfo: {
        position: 'absolute',
        bottom: 40,
        height: 50,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'stretch'
    },

    infoText: {
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft: 20,
        marginRight: 10
    },
    infoPicture: {
        width: 14,
        height: 14,
        position: 'absolute',
        top: 3,
        left: 3
    },
    infoTime: {
        height: 20,
        width: 'auto',
        backgroundColor: '#FF445588',
        borderRadius: 10,
        margin: 5,
    },
    infoOrganisator: {
        height: 20,
        width: 'auto',
        backgroundColor: '#5599FF88',
        borderRadius: 10,
        margin: 5,
    },

    eventButtons: {
        flexDirection: 'row'
    },
    moreButton: {
        height: 30,
        backgroundColor: '#5CA1D8',
        borderRadius: 15,
        margin: 5,
    },
    moreText: {
        color: '#FFFFFF',
        fontSize: 20,
        marginHorizontal: 15
    },
    extendButton: {
        width: 30,
        height: 30,
        backgroundColor: '#5CA1D8',
        borderRadius: 15,
        margin: 5,
        marginLeft: 0,
    },
    extendImage: {
        width: 16,
        height: 16,
        position: 'absolute',
        top: 7,
        left: 7
    },

    details: {
        width: '100%',
        flexDirection: 'column'
    },
    detailsItem: {
        width: '100%',
        height: 30,
        borderColor: '#DDDDDD',
        borderTopWidth: 1,
        flexDirection: 'row'
    },
    detailsTextName: {
        width: 120,
        fontSize: 18,
        color: '#BBBBBB'
    },
    detailsText: {
        fontSize: 18,
        color: '#999999'
    },
    detailsImage: {
        width: 18,
        height: 18,
        margin: 5,
        tintColor: '#2E72A0',
        marginHorizontal: 10
    }
});