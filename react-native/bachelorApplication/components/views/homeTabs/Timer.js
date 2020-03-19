import React, { Component } from 'react'
import {StyleSheet, Text, View, Button } from 'react-native'
import BackgroundTimer from "react-native-background-timer";

export default class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			second: 0,
			timerActive: false,
			//database: require('.../db/config-db.json')
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
		if(this.state.timerActive == true){
			alert('Timer is already active')
		}
	}
	
	onPause = () => {
		BackgroundTimer.clearInterval(this._interval);
		this.setState({timerActive: false});
	}
	
	onReset = () => {
		this.setState({
			second: 0,
			timerActive: false,
		});
		BackgroundTimer.clearInterval(this._interval);
	}

	render() {
		let hours = Math.floor(this.state.second / 3600);
		let minutes = Math.floor((this.state.second - hours * 3600) / 60);
		let seconds = this.state.second - minutes * 60 - hours * 3600;

		seconds = seconds < 1 ? '00' : seconds < 10 ? `0${seconds}` : seconds;
		minutes = minutes < 1 ? '00' : minutes < 10 ? `0${minutes}` : minutes;
		hours = hours < 1 ? '00' : hours < 10 ? `0${hours}` : hours;

		return (
			<View style={styles.container}>
				<Text style={styles.text}>Application Timer</Text>
				<Text style={styles.secondText}>{hours}:{minutes}:{seconds}</Text>
				<View style={styles.buttonWrapper}>
					<Button title=" 	Start	" onPress={this.onStart}></Button>
					<Button title=" 	Stop	" onPress={this.onPause}></Button>
					<Button title=" 	Reset	" onPress={this.onReset}></Button>
				</View>
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
	secondText: {
		fontSize: 90,
	},
	text: {
		fontSize: 25,
	}
});
