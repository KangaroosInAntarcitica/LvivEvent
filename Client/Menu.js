import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, FlatList, ScrollView } from 'react-native';

// this is how menuHeader property should look:
// onPress is called with the button id
const defaultMenuHeader = {
    name: 'Welcome!',
    buttons: [
        {id: 'Test', title: 'Test', onPress: (id) => {Alert.alert('Pressed', 'id: ' + id)}}
    ]
};

class Header extends Component{
    render(){
        return(
            <View style={styles.header}>
                <Image style={styles.backgroundImage} source={require('./images/menuHeaderBack.png')} />
                <View>
                    <TouchableOpacity onPress={ () => {} } style={styles.headerButton}>
                        <Image style={styles.backgroundImage} source={require('./images/menu-icon-white.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}> { this.props.text } </Text>
                <View style={{flexDirection: 'row'}} >
                    <TouchableOpacity onPress={ ()=>{} } style={styles.headerButton} >
                        <Image style={styles.backgroundImage} source={require('./images/search-icon-white.png')} />
                    </TouchableOpacity>
                </View>
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
                    <View style={styles.optionsButtonRect}>
                        <Text style={styles.optionsTextSelected}> {this.props.title} </Text>
                    </View>
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
    state = { selected: null}
    onPressItem(id){
        // set
        this.setState({selected: id});
        // call the function
        for(let i = 0; i < this.props.data.length; i++){
            let item = this.props.data[i];
            if(item.id === id)
                item.onPress(id);
        }
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
                selected={this.state.selected === item.id}
            />
        );
    }
    render(){
        return(
            <View style={styles.options}>
                <FlatList
                    horizontal={true}
                    contentContainerStyle={styles.optionsList}
                    data={this.props.data}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        );
        <Image style={styles.backgroundImage} source={require('./images/menuOptionsBack.png')} />
    }
}

export default class Menu extends Component{
    render(){
        return(
            <View style={styles.page}>
                <Header text={this.props.menuHeader ? this.props.menuHeader.name : defaultMenuHeader.name} />
                <Options data={this.props.menuHeader ? this.props.menuHeader.buttons : defaultMenuHeader.buttons} />

                { this.props.innerPage }
            </View>
        );
    }
}

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
        color: "#FFFFFF",
        fontWeight: 'bold',
        margin: 8
    },
    options: {
        width: "100%",
        height: 40,
        backgroundColor: "#227FDD",
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    optionsList: {
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    optionsButton: {
        height: 40
    },
    optionsButtonRect: {
        height: 30,
        margin: 5,
        padding: 0,
        backgroundColor: '#146CB4',
        borderRadius: 15
    },
    optionsText: {
        fontSize: 22,
        color: "#146CB4",
        padding: 6,
        paddingHorizontal: 15
    },
    optionsTextSelected: {
        fontSize: 22,
        color: '#FFFFFF',
        padding: 0,
        paddingHorizontal: 10,
    },
    shadow: {
        position: 'absolute',
        left: 0,
        top: 90,
        width: "100%",
        height: 5,
        resizeMode: "stretch"
    }
});