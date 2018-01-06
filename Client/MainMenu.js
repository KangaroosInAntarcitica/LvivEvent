import React, {Component, PureComponent} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet, Image, FlatList} from 'react-native';

class MainMenuHeader extends Component{
    render(){
        return(
            <View style={styles.header}>
                <Image style={styles.backgroundImage} source={require('./images/mainMenuHeader.png')} />
            </View>
        );
    }
}

class MainMenuItem extends Component{
    onPress(){
        this.props.onPress(this.props.id);
    }
    render() {
        const style = this.props.selected ? styles.buttonSelected : styles.button;
        const textStyle = this.props.selected ? styles.buttonTextSelected : styles.buttonText;
        return (
            <TouchableOpacity style={style} onPress={this.onPress.bind(this)}>
                    <Text style={textStyle}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
}

export default class MainMenu extends PureComponent {
    state = {selected: (new Map())};

    keyExtractor = (item, index) => item.id;

    onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.forEach((value, key) => selected.set(key, false));
            selected.set(id, true); // toggle
            return {selected};
        });
    };

    renderItem = ({item}) => (
        <MainMenuItem
            id={item.id}
            onPress={this.onPressItem.bind(this)}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
        />
    );

    render()
    {
        return (
            <View style={styles.page}>
                <MainMenuHeader />
                <FlatList
                    data={this.props.data}
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
    header: {
        width: '100%',
        height: 50,
        marginBottom: 4
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
        padding: 4,
        height: 30
    },
    buttonSelected: {
        height: 30,
        margin: 4,
        marginVertical: 2,
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#F6FBFE'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    buttonTextSelected: {
        color: '#146CB4',
        fontSize: 16
    }
});