import React, {Component} from 'react';
import { AppRegistry, Alert, View } from 'react-native';

import Login from "./Login.js";
import Register from "./Register.js"
import Menu from "./Menu.js";
import MainMenu from "./MainMenu.js";
import EventsList from "./EventsList.js";
import Event from "./Event.js";
import NewEvent from "./NewEvent.js";

import SideMenu from './node_modules/react-native-side-menu/index.js'

// some constants
const url = "https://lvivevent.herokuapp.com/";

// attributes: id (unique for tab), title (text displayed), onPress (function, optional)
const defaultMenuData = {
    settings: [
        {id: 'settings', title: 'Main settings', onPress: () => {Alert.alert('Info', 'worked!')}}
    ],
    messages: [
        {id: 'test1', title: 'Test message 1'},
        {id: 'test2', title: 'Test message 2'}
    ],
    events: [
        {id: 'events', title: 'Events', onPress: () => {setMenu('events', null)}},
        {id: 'newEvent', title: 'New Event', onPress: () => {setMenu('newEvent', null)}}
    ],
    profile: [
        {id: 'profile', title: 'My Profile'},
        {id: 'friends', title: 'Friends'},
        {id: 'profileSettings', title: 'Profile Settings'},
        {id: 'logout', title: 'Log Out', onPress: () => {setAppState('login')}}
    ]
};

export default class Application extends Component {
    constructor(properties){
        super();
        this.state = {
            appState: "menu",
            menuState: "events",
            menuStateDetails: null,
            // the information showed in the Menu (details in the Menu.js file)
            menuHeader: {
                name: 'me', buttons: []
            }
        };

        this.setMenuHeader = this.setMenuHeader.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.getPage = this.getPage.bind(this);
        this.setMenu = this.setMenu.bind(this);
        this.setAppState = this.setAppState.bind(this);

        // make global
        window.setMenu = this.setMenu;
        window.setAppState = this.setAppState;
    }
    setMenuHeader(menuHeader){
        this.setState({menuHeader})
    }
    setAppState(appState){
        this.setState({appState})
    }

    setMenu(menuState, menuStateDetails){
        this.setState({menuState, menuStateDetails});
    }
    getMenu(){
        if(this.state.menuState === 'events' || !this.state.menuState) {
            return <Menu
                innerPage={<EventsList url={"https://lvivevent.herokuapp.com/"} setMenuHeader={this.setMenuHeader} setMenu={this.setMenu}/>}
                menuHeader={this.state.menuHeader}
            />
        }
        else if(this.state.menuState === 'event'){
            return <Menu
                innerPage={<Event url={"https://lvivevent.herokuapp.com/"} setMenuHeader={this.setMenuHeader} event={this.state.menuStateDetails}/>}
                menuHeader={this.state.menuHeader}
            />
        }
        else if(this.state.menuState === 'newEvent'){
            return <Menu
                innerPage={<NewEvent url={"https://lvivevent.herokuapp.com/"} setMenuHeader={this.setMenuHeader}/>}
                menuHeader={this.state.menuHeader}
            />
        }
    }
    getPage(){
        if(this.state.appState === "login")
            return(<Login
                onSuccess={() => { this.setState({appState: "menu"}); }}
                register={() => { this.setState({appState: "register"}); }}
                url={url}
            />);
        else if(this.state.appState === "register")
            return(<Register
                onSuccess={() => {this.setState({appState: "login"}); }}
                login={() => { this.setState({appState: "login"}); }}
                url={url}
            />);

        else if(this.state.appState === "menu")
            return(<SideMenu
                edgeHitWidth={60}
                toleranceX={10}
                openMenuOffset={240}
                bounceBackOnOverdraw={false}
                isOpen={false}
                menu={ <MainMenu data={defaultMenuData}/> }

            >
                { this.getMenu() }
            </SideMenu>);
    }
    render(){
        return(
            <View style={{backgroundColor: "#146CB4", height: '100%', width: '100%'}}>
                { this.getPage.call(this) }
            </View>
        );
    }
}