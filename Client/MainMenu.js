import React, {Component, PureComponent} from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, StyleSheet, Image, FlatList} from 'react-native';

// Can not be changed. Main menu data should have stuff for each of this. If other - won't be displayed
const headerData = [
    {id: 'settings'},
    {id: 'messages'},
    {id: 'events'},
    {id: 'profile'}
];

class HeaderItem extends Component{
    // An option in the header menu. The defaults are in the header items. Set in the data
    // Properties: id (image is chosen by id); onPress(id); selected = bool; title (text)
    // type = 'button', 'title', 'info'
    onPress(){
        this.props.onPress(this.props.id);
    }
    render() {
        const style = this.props.selected ? styles.headerItemSelected : styles.headerItem;
        const imageStyle = this.props.selected ? styles.headerImageSelected : styles.headerImage;
        let image;
        if(this.props.id === 'settings') image = require('./images/settings-icon.png');
        else if(this.props.id === 'messages') image = require('./images/chat-icon-white.png');
        else if(this.props.id === 'events') image = require('./images/calendar-icon-white.png');
        else if(this.props.id === 'profile') image = require('./images/profile-icon-white.png');

        return (
            <TouchableOpacity style={style} onPress={this.onPress.bind(this)}>
                <Image style={imageStyle} source={ image } />
            </TouchableOpacity>
        );
    }
}

class MainMenuHeader extends PureComponent {
    // The header.
    // Properties: data {id}; onPress; selected = id
    renderItem = ({item}) => (
        <HeaderItem
            id={item.id}
            onPress={this.props.onPress}
            selected={!!(this.props.selected === item.id)}
            image={item.image}
        />
    );

    render()
    {
        return (
            <View style={styles.header}>
                <Image style={styles.backgroundImage} source={require('./images/mainMenuHeader.png')} />
                <FlatList contentContainerStyle={styles.headerList}
                    data={this.props.data}
                    extraData={this.props.selected}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

class MainMenuItem extends Component{
    // Properties: data {id, title}; onPress(id); selected = bool
    onPress(){
        this.props.onPress(this.props.id);
    }
    renderButton(){
        const style = this.props.selected ? styles.buttonSelected : styles.button;
        const textStyle = this.props.selected ? styles.buttonTextSelected : styles.buttonText;
        return (
            <TouchableOpacity style={style} onPress={this.onPress.bind(this)}>
                <Text style={textStyle}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
    renderTitle(){
        return(
            <Text style={styles.title}> {this.props.title} </Text>
        );
    }
    render() {
        if(this.props.type === 'button' || ! this.props.type)
            return this.renderButton();
        else if(this.props.type === 'title')
            return this.renderTitle();
    }
}

export default class MainMenu extends PureComponent {
    // Properties: data
    state = {
        // responsible for current menu state (can be one of settings, messages, events, profile)
        selectedTab: 'events',
        selectedData: this.props.data['events'],
        // responsible for selected item in submenu
        selected: this.props.data['events'][0].id,
    };

    keyExtractor = (item, index) => item.id;

    changeTab = (id) => {
        this.setState({
            selectedTab: id,
            selectedData: this.props.data[id],
            selected: this.props.data[id][0].id
        });
    };

    onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState({selected: id});
        // find the required element
        for(let i = 0; i < this.state.selectedData.length; i++){
            let item = this.state.selectedData[i];
            if(item.id === id && item.onPress){
                item.onPress();
            }
        }
    };

    renderItem = ({item}) => (
        <MainMenuItem
            id={item.id}
            onPress={this.onPressItem.bind(this)}
            selected={!!(this.state.selected === item.id)}
            title={item.title}
            type={item.type}
        />
    );

    render()
    {
        return (
            <View style={styles.page}>
                <MainMenuHeader data={headerData} onPress={this.changeTab.bind(this)} selected={this.state.selectedTab}/>
                <FlatList
                    data={this.state.selectedData}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        width: 240,
        height: "100%",
        backgroundColor: "#146CB4",
        flexDirection: "column"
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'stretch'
    },
    button: {
        margin: 4,
        marginVertical: 2,
        padding: 10,
        paddingVertical: 4,
        height: 34
    },
    buttonSelected: {
        height: 34,
        margin: 6,
        marginVertical: 2,
        padding: 10,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: '#F6FBFE'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    buttonTextSelected: {
        color: '#146CB4',
        fontSize: 18
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20
    },

    header: {
        width: '100%',
        height: 50,
        marginBottom: 4
    },
    headerList: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row'
    },
    headerItem: {
        width: 50,
        height: 50
    },
    headerItemSelected: {
        width: 50,
        height: 50,
        backgroundColor: '#FFFFFFAA'
    },
    headerImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
        tintColor: '#FFFFFF99'
    },
    headerImageSelected: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
        tintColor: '#146CB4'
    }
});