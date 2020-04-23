import React, { Component } from 'react'
import {StyleSheet, View, Text, Button, ImageBackground, TextInput, Image} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class Authorizaton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uniqueId: DeviceInfo.getUniqueId(),
			database: require('../db/config-db.json')
		};
	}

	 async isUser() {
		let OK = 200;

		try {
			let response = await fetch('http://' + this.state.database.ip + '/_db/Bachelor/user_crud/users/'+ this.state.uniqueId);
			
			if(response.status == OK){
				this.props.navigation.navigate('HomeScreen')
			}
			else{
				this.addUser(this.state.uniqueId);
			}
		}	
		catch (error) {
			alert(error);
		}
	}

	async addUser(uniqueId){
		let OK = 201;
		try{
			let response = await fetch('http://' + this.state.database.ip + '/_db/Bachelor/user_crud/users', {
			method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				 },
				body: JSON.stringify({
					_key: uniqueId
				}),
			});

			if(response.status == OK){
				this.props.navigation.navigate('HomeScreen')
			}
		}
		catch (error) {
			alert(error);
		}
	}
	
	render() {
		return (
			<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
				<Image
					style={styles.tinyLogo}
					source={require('../images/clock.png')}
				/>
			<Text style={{ fontSize:24, marginBottom:15 }}>Welcome</Text>
			<Button 
				color='#f4511e'
				title='				Get started				' 
				onPress={() => this.isUser()}></Button>
		</View>
		)
	}
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: '#FFFFFF',
	},
	tinyLogo: {
		width: 400,
		height: 400,
		marginTop:-130,
	},
	text: {
		fontSize: 20,
	},

});