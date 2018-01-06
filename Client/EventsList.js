import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

export default class EventsList extends Component{
    renderItem({item}){
        return(
            <View style={styles.event}>
                { item.image ? <Image style={styles.eventImage} source={{uri: item.image}}/> : null }
                <TouchableOpacity style={styles.eventTextBox}>
                    <Text style={styles.eventText}> {item.title} </Text>
                    <Image source={require('./images/menuOptionsBack.png')}/>
                </TouchableOpacity>
                <View style={styles.eventInfo}>
                    <Image source={require('./images/eventFront.png')} style={styles.backgroundImage}/>
                    <Text> Some info here </Text>
                </View>
            </View>
        )
    }
    render() {
        return (
            <FlatList contentContainerStyle={styles.list}
                data={this.props.data}
                keyExtractor={ (item, index) => item.id }
                renderItem={this.renderItem}
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
        width: '100%',
        height: 30,
        backgroundColor: '#B3DEF8'
    },
    eventText: {
        fontSize: 16,
        color: "#2E72A0",
        padding: 4,
        paddingHorizontal: 10
    },
    eventInfo: {
        position: 'absolute',
        bottom: 30,
        height: 50,
        width: '100%',
        justifyContent: 'flex-end'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'stretch'
    }
});