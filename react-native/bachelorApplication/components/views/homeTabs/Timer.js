import React, { Component} from 'react'
import {StyleSheet, Text, View, Button, TouchableOpacity, Alert} from 'react-native'
import BackgroundTimer from "react-native-background-timer";
import DialogInput from 'react-native-dialog-input';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';

const timerResetState = 0

export default class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			second: timerResetState,
			timerActive: false,
			isDialogVisible: false,
			uniqueId: DeviceInfo.getUniqueId(),
			location: null,
			database: require('../../db/config-db.json')
		};
	}

	_interval: any;

	onStart = () => {

		if (Platform.OS =="ios") {
			BackgroundTimer.start();
		  }

		if(this.state.timerActive == false){
			this.setState({timerActive: true});
			this._interval = BackgroundTimer.setInterval(() => {
				this.setState({
				second: this.state.second + 1,
			})
				}, 1000);
		}
	}
	
	onPause = () => {
		BackgroundTimer.clearInterval(this._interval);
		this.setState({timerActive: false});
	}
	
	onReset = () => {
		this.setState({
			second: timerResetState,
			timerActive: false,
		});
		BackgroundTimer.clearInterval(this._interval);
	}

	async onSaveActivity(activityName){
		this.showDialog(false);
		let OK = 201;
		let today = new Date();
		let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();

		let test = JSON.parse(this.state.location)
		let latitude = JSON.stringify(test.coords.latitude);
		let longitude = JSON.stringify(test.coords.longitude);
		try{
			let response = await fetch('http://' + this.state.database.ip + '/_db/Bachelor/activities_crud/activities', {
			method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				 },
				body: JSON.stringify({
					user: this.state.uniqueId,
					activity: activityName,
					time: this.timeConvert(),
					date: date,
					lat: longitude,
					long: latitude,
					status: "Finished Activity"
				}),
			});

			if(response.status == OK){
				this.onReset();
			}
			else {
				alert('Action failed: Invalid activity name')
			}
		}
		catch (error) {
			alert(error);
		}
	  }
	
	findCoordinates = () => {
		Geolocation.getCurrentPosition(
			position => {
			const location = JSON.stringify(position);

			this.setState({ location });
			},
		error => Alert.alert(error.message),
		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

	showDialog(isShow){
		this.onPause()
		this.setState({
			isDialogVisible: isShow
		});
	  }

	timeConvert(){
		let hours = Math.floor(this.state.second / 3600);
		let minutes = Math.floor((this.state.second - hours * 3600) / 60);
		let seconds = this.state.second - minutes * 60 - hours * 3600;

		seconds = seconds < 1 ? '00' : seconds < 10 ? `0${seconds}` : seconds;
		minutes = minutes < 1 ? '00' : minutes < 10 ? `0${minutes}` : minutes;
		hours = hours < 1 ? '00' : hours < 10 ? `0${hours}` : hours;

		let time = hours + ':' + minutes + ':' + seconds;
		return time
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Application Timer</Text>
			<Text style={styles.secondText}>{this.timeConvert()}</Text>
				
				<View style={styles.buttonWrapper}>
					<Button title=" 	Start	" onPress={() =>this.onStart()}></Button>
					<Button title=" 	Stop	" onPress={() =>this.onPause()}></Button>
					<Button title=" 	Reset	" onPress={() =>this.onReset()}></Button>
				</View>
				
				<View style={styles.buttonWrapperTwo}><Button title=" 	Save Activity	" onPress={() => (this.findCoordinates(),this.showDialog(true))}></Button></View>
				
				
				<DialogInput isDialogVisible={this.state.isDialogVisible}
					title={"Timer"}
					message={"Activity Details"}
					hintInput ={"Activity Name"}
					submitInput={ (inputText) => {this.onSaveActivity(inputText)} }
					closeDialog={ () => {this.showDialog(false)}}>
				</DialogInput>

			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonWrapper: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	buttonWrapperTwo: {
		marginTop: 15,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	secondText: {
		fontSize: 90,
	},
	text: {
		fontSize: 25,
	},
});
