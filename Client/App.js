import React, {Component} from 'react';
import { AppRegistry, Alert, View } from 'react-native';

import Login from "./Login.js";
import Register from "./Register.js"
import Menu from "./Menu.js";
import MainMenu from "./MainMenu.js";

import SideMenu from './node_modules/react-native-side-menu/index.js'

export default class Application extends Component {
    constructor(properties){
        super();
        this.state = {
            appState: "login",
            open: false
        };
    }
    getMenu(){
        if(this.state.appState === "login")
            return(<Login
                onSuccess={() => { this.setState({appState: "menu"}); }}
                register={() => { this.setState({appState: "register"}); }}
                url={"https://lvivevent.herokuapp.com/"}
            />);
        else if(this.state.appState === "register")
            return(<Register
                onSuccess={() => {this.setState({appState: "login"}); }}
                login={() => { this.setState({appState: "login"}); }}
                url={"https://lvivevent.herokuapp.com/"}
            />);
        else if(this.state.appState === "menu")
            return(<SideMenu edgeHitWidth={60}
                      toleranceX={10}
                      openMenuOffset={240}
                      bounceBackOnOverdraw={false}
                      isOpen={this.state.open}
                      menu={this.getMainMenu.call(this)}
            >
                { <Menu /> }
            </SideMenu>);
    }
    getMainMenu(){
        return(
            <MainMenu data={
                [
                    {id: "hello", title: "hello"},
                    {id: "bye", title: "bye"},
                    {id: "whatever", title: "wtf"}
                ]
            }/>
        );
    }
    render(){
        return(
            <View style={{backgroundColor: "#146CB4", height: '100%', width: '100%'}}>
                { this.getMenu.call(this) }
            </View>
        );
    }
}