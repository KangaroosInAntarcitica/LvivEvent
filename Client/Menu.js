import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, FlatList } from 'react-native';

import EventsList from './EventsList.js';

class Header extends Component{
    render(){
        return(
            <View style={styles.header}>
                <Image style={styles.backgroundImage} source={require('./images/menuHeader.png')} />
                <TouchableOpacity onPress={ () => {} } style={styles.headerButton}>
                    <Image style={styles.backgroundImage} source={require('./images/menuButton.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}> { this.props.text } </Text>
                <TouchableOpacity onPress={ ()=>{} } style={styles.headerButton} />
            </View>
        );
    }
}

class Option extends Component{
    onPress() {
        this.props.onPress(this.props.id);
    }
    render(){
        if(this.props.selected)
            return(
                <TouchableOpacity onPress={ this.onPress.bind(this) } style={styles.optionsButton}>
                    <Image style={styles.backgroundImage} source={require('./images/optionsBackSelected.png')} />
                    <Text style={styles.optionsTextSelected}> {this.props.title} </Text>
                </TouchableOpacity>
            );
        else
            return(
                <TouchableOpacity onPress={ this.onPress.bind(this) } style={styles.optionsButton}>
                        <Text style={styles.optionsText}> {this.props.title} </Text>
                </TouchableOpacity>
            );
    }
}

class Options extends PureComponent{
    state = { selected: new Map()}
    onPressItem(id){
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.forEach((value, key) => selected.set(key, false));
            selected.set(id, true); // toggle
            return {selected};
        });
    }
    keyExtractor(item, index){
        return item.id;
    }
    renderItem({item}){
        return(
            <Option
                title={item.title}
                id={item.id}
                onPress={this.onPressItem.bind(this)}
                selected={!!this.state.selected.get(item.id)}
            />
        );
    }
    render(){
        return(
            <View style={styles.options}>
                <Image style={styles.backgroundImage} source={require('./images/menuOptionsBack.png')} />
                <FlatList
                    contentContainerStyle={styles.optionsList}
                    data={this.props.data}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        );
    }
}

export default class Menu extends Component{
    render(){
        return(
            <View style={styles.page}>
                <Header text={"Hello page"}/>
                <Options data={menuOptions} />

                <EventsList data={eventsData} />

                <Image style={styles.shadow} source={require('./images/optionsShadowShort.png')} />
            </View>
        );
    }
}

const eventsData = [
    {title: 'Lekciya Shcherbiny', id: 'super', image: 'https://www.newstatesman.com/sites/all/themes/creative-responsive-theme/images/new_statesman_events.jpg'},
    {title: 'Fuchin Hell', id: 'hell', image: false},
    {title: 'What is this', id: 'donno man', image: 'http://9squareevents.com/wp-content/uploads/2014/07/events.jpg'},
    {title: 'Yet another useless box', id: 'useless', image: false},
    {title: 'What is this?', id: 'hey', image: false},
    {title: 'Lviv City Council Party', id: 'partyParty', image: false}
];

const menuOptions = [
    {id: 'hello', title: 'hello'},
    {id: 'bye', title: 'bye'},
    {id: 'wtf', title: 'what the actual'}
];

const styles = StyleSheet.create({
    page: {
        width: '100%',
        height: '100%',
        backgroundColor: "#F6FBFE"
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'stretch'
    },
    header: {
        width: "100%",
        height: 50,
        backgroundColor: "#146CB4",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerButton: {
        width: 34,
        height: 34,
        backgroundColor: "#FFFFFF00",
        margin: 7,
        marginHorizontal: 10
    },
    headerText: {
        fontSize: 24,
        color: "#CDE7FA",
        margin: 8
    },
    options: {
        width: "100%",
        height: 36,
        backgroundColor: "#227FDD",
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    optionsList: {
        width: "100%",
        height: 36,
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    optionsButton: {
        height: "100%"
    },
    optionsText: {
        fontSize: 18,
        color: "#146CB4",
        padding: 6,
        paddingHorizontal: 10
    },
    optionsTextSelected: {
        fontSize: 18,
        color: "#2E72A0",
        padding: 6,
        paddingHorizontal: 10
    },
    shadow: {
        position: 'absolute',
        left: 0,
        top: 86,
        width: "100%",
        height: 5,
        resizeMode: "stretch"
    }
});