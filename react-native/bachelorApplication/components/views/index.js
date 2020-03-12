import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home!</Text>
		</View>
	);
};
  
function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Settings!</Text>
		</View>
	);
};

const Tab = createBottomTabNavigator();

function HomeTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
}

export default function Home() {
	return (
		//<NavigationContainer>
			<HomeTabs />
		//</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
	},
});