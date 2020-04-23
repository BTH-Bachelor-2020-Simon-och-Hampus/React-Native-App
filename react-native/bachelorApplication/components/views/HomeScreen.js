import React, { Component } from 'react'
import {StyleSheet, Text, View, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import TimerScreen from './homeTabs/Timer'
import TimerOverview from './homeTabs/TimerOverview'

export default class HomeScreen extends Component {
	render() {
		return (
		<HomeTabs />
		)
	}
}

function HomeTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Timer" component={TimerScreen} />
			<Tab.Screen name="Activities" component={TimerOverview} />
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
	},
});